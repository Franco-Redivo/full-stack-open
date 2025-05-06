const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

let loggedUserToken

beforeEach(async () => {
  
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.loginUser.password, 10)
    const user = new User({ username: helper.loginUser.username, passwordHash })
    const savedUser = await user.save()

    const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: savedUser._id }))
    const promiseArray = blogObjects.map(blog => blog.save())
    const savedBlogs = await Promise.all(promiseArray)

    savedUser.blogs = savedBlogs.map(blog => blog._id)
    await savedUser.save()

    const response = await api.post('/api/login').send(helper.loginUser)
    loggedUserToken = response.body.token
})

describe('When there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(e => e.title)
        assert(titles.includes('React patterns'))
    })
})

describe('viewing a specific blog', () => {
    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(resultBlog.body.title, blogToView.title)
        assert.strictEqual(resultBlog.body.author, blogToView.author)
        assert.strictEqual(resultBlog.body.url, blogToView.url)
        assert.strictEqual(resultBlog.body.likes, blogToView.likes)
        assert.strictEqual(resultBlog.body.id, blogToView.id)
    })

    test('should return blogs with right unique identifier property', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach((blog) => {
            assert.ok(blog.id !== undefined)
            assert.strictEqual(blog._id, undefined)
        })
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()
        await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
        }

        const blogsAtStart = await helper.blogsInDb()

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loggedUserToken}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

        const titles = blogsAtEnd.map(r => r.title)
        assert(titles.includes('TDD harms architecture'))
    })

    test('blog with likes property missing defaults to 0 likes', async () => {
        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loggedUserToken}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('blog without title is not added', async () => {
        const newBlog = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loggedUserToken}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loggedUserToken}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status 401 if token is not provided', async () => {
        const newBlog = {
          title: 'Unauthorized blog',
          author: 'No Token',
          url: 'http://notoken.com',
          likes: 0
        }
    
        const result = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length)
      })
})

describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${loggedUserToken}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(n => n.title)
        assert(!titles.includes(blogToDelete.title))
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
})

describe('updating a blog', () => {
    test('a blog\'s likes property can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedData = { likes: blogToUpdate.likes + 1 }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })
})

after(async () => {
    await mongoose.connection.close()
})


