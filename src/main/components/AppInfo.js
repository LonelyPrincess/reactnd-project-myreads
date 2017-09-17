import React from 'react';

/**
 * Stateless component to render static information about this application.
 *
 * @module components/AppInfo
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
function AppInfo () {
  const devProfiles = [
    { name: 'GitHub', url: 'https://www.github.com/LonelyPrincess' },
    { name: 'LinkedIn', url: 'https://es.linkedin.com/in/sara-hernández-suárez-167013115' }
  ];

  return (
    <section className="container" data-page="about">

      <section>
        <h2>About 'MyReads'</h2>
        <p>The aim of this application is to allow the user to keep track of their own personal library. It includes a list of the books that are already in their possession or those in their wishlist.</p>
        <p>Each of these books will be grouped in three shelves depending on their status:</p>

        <ul>
          <li>Currently reading</li>
          <li>Want to read</li>
          <li>Read</li>
        </ul>

        <p>The user will be able to change a book status anytime, as well as add new titles to their collection or remove items from their library.</p>
      </section>

      <section>
        <h2>About the project</h2>
        <p>This application was built by using <a href="https://facebook.github.io/react/" target="_blank">React.js</a>, and serves as the final project for the first module of the <a href="https://www.udacity.com/course/react-nanodegree--nd019" target="_blank">Udacity's React nanodegree</a>, <em>"React Fundamentals"</em>.</p>
        <p>If you like what you're seeing, you can view the source code at <a href="https://github.com/LonelyPrincess/reactnd-project-myreads" target="_blank">project's repository</a> and support this work by staring it or following the <a href="https://github.com/LonelyPrincess" target="_blank">author</a> in <a href="https://github.com/" target="_blank">GitHub</a>.</p>
      </section>

      <section>
        <h2>About the developer</h2>
        <p>This little project was created by an spanish girl called Sara, also known in the web by the nicknames <i>LonelyPrincess</i> and <i>Natsuko Kuroigawa</i>.</p>
        <p>Currently working as an hybrid mobile developer, her true passion lies in web development and enrolled in this nanodegree to get hands-on React and keep on improving her skills as a full-stack web developer.</p>
        <p>She's also an avid fan of videogames (especially japanese rpgs and survival horror), and other hobbies of hers include reading, watching anime series, writing and listening to music while programming. As you have probably noticed by now, she has a soft-spot for cats.</p>

        <p>For more information, feel free to check any of these online profiles:</p>

        <ul>
          {devProfiles.map((profile, index) => (
            <li key={index}><a href={profile.url} target="_blank">{profile.name}</a></li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default AppInfo;