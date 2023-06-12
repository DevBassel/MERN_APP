export default function Post({ tittle, content, image }) {
  return (
    <>
      <div className="post-content">
        <h3>{tittle}</h3>
        <p>{content}</p>
      </div>
      <div className="post-img">
        <img src={image} alt="postImage" />
      </div>
    </>
  );
}
