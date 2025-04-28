const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total Likes', () => {
    const listWithOneBlog = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            id: '5a422aa71b54a676234d17f8',
        }
    ]
    const listWithTwoBlogs = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            id: '5a422aa71b54a676234d17f8',
        },
        {
            title: 'Go To Statement Considered Harmful Pt 2',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 32,
            id: '6b642a71b54a676234d17f8',
        }

    ]
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of empty list is zero',() => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        assert.strictEqual(result,37)
    })
})