import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

  const [title, setTitle] = useState('');
  const [body , setbody] = useState('');
  const [author, setauthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();


  const handleSubmit = (e) => {
   e.preventDefault();
   const blog = { title, body, author };

   setIsPending(true);

   fetch('http://localhost:8000/blogs', {
    method: 'POST',
    headers: { "content-type": "application/json"},
    body: JSON.stringify(blog)
   }).then(() => {
    console.log('new blog added')
    setIsPending(false);
   
    //history.go(-1);
      history.push('/');

  })
  }

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input 
        type="text" 
        required
        value={title}
        onChange = {(e) => setTitle(e.target.value)}
         />
        <label>Blog Body:</label>
        <textarea 
        required
        value={body}
        onChange = {(e) => setbody(e.target.value)}
        ></textarea>
        <label>Blog Author: </label>
        <select
        value={author}
        onChange= {(e) => setauthor(e.target.value)}>
            <option value="mario"></option>
            <option value="yoshi"></option>
            <option value="bal"></option>
        </select>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
        <p>{ title }</p>
        <p>{ body }</p>
      </form>
    </div>
  );
};

export default Create;
