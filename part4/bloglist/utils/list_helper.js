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

module.exports = {dummy,totalLikes,favoriteBlog}