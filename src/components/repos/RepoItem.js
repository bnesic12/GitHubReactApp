import React from 'react';

// Emmet: rfc
export default function RepoItem({ repo: { name, html_url, description } }) {
  return (
    <div>
      <br></br>
      <label>Repo name: {name}</label>

      <li>
        URL: <a href={html_url}>{html_url}</a>
      </li>
      {description ? <li>Description: {description}</li> : <label></label>}
    </div>
  );
}
