const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogList) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogList.length === 0
    ? 0
    : blogList.reduce(reducer, 0);
}

const favoriteBlog = (blogList) => {
    if (blogList.length === 0) return null

    const blog = blogList.reduce((favourite, current) =>
        favourite.likes > current.likes ? favourite : current
    )
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog.id,
    }

}

const mostBlogs = (blogList) => {
    if (blogList.length === 0) return null
    const list = [];
    blogList.forEach((blog) => {
        const author = list.find((a) => a.author === blog.author);
        if (author) {
            author.blogs += 1;
        } else {
            list.push({ author: blog.author, blogs: 1 });
        }
    });
    const mostBlogsAuthor = list.reduce((prev, current) => {
        return prev.blogs > current.blogs ? prev : current;
    });
    return {
        author: mostBlogsAuthor.author,
        blogs: mostBlogsAuthor.blogs,
    }
    
}

const mostLikes = (blogList) => {
    if (blogList.length === 0) return null
    const list = [];
    blogList.forEach((blog) => {
        const author = list.find((a) => a.author === blog.author);
        if (author) {
            author.likes += blog.likes;
        } else {
            list.push({ author: blog.author, likes: blog.likes });
        }
    });
    const mostLikesAuthor = list.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current;
    });
    return {
        author: mostLikesAuthor.author,
        likes: mostLikesAuthor.likes,
    }
}


module.exports = {dummy,totalLikes,favoriteBlog,mostBlogs, mostLikes}