
export default function Post({ tittle, content, image, author ,createdAt}) {
  return (
    <>
      <div className="post-content">
        <h3>{tittle}</h3>
        <p>{content}</p>
        <p>createor: {author.name}</p>
        <p>createdAt: {createdAt}</p>
      </div>
      <div className="post-img">
        <img src={image} alt="postImage" />
      </div>
    </>
  );
}
