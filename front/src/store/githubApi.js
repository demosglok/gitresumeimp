export default {
  loadResume(githublogin) {
    console.log('githubApi', githublogin);
    if(githublogin) {
      return fetch(`https://api.github.com/repos/${githublogin}/gitresume/contents/resume.json`,
        {
          method: 'GET',
          //mode: 'no-cors',
          headers: {
            Accept: 'application/vnd.github.v3+json',
          }
        })
        .then(res => res.json())
        .then(resume => {
          console.log('content',resume.content);
          if(resume.content) {
            const decoded = atob(resume.content)
            try {
              return JSON.parse(decoded);
            } catch (ex) {
              console.log('error', ex.message, decoded);
              return {error: `Failed to parse resume ${ex.message}`};
            }
          } else {
            return {error: 'NO RESUME: empty or unexistent resume.json file '};
          }
        })
        .catch(err => ({error: `Failed to load resume ${err.message}`}));
    } else {
      return Promise.then(() => null);
    }
      
  }
}