import { useSelector } from "react-redux";

const UserDetails = ({ user }) => {
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs created</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetails;