import React from 'react'

export default function Header() {
  return (
    <div className="header">
      <img class="headerlogo" src={process.env.PUBLIC_URL + "/spotify.png"}></img>
      <div>
      <h1 class="header-title"> People the DJ test</h1>
      <p class="header-subtitle">The people have spoken. Let them curate your playlists.</p>
      </div>
      
    </div>
  )
}
