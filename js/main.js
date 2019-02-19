$(document).ready(function() {
  $('#searchUser').keyup(function(e) {
    let username = e.target.value;

    //Make ajax call to Github to retrieve 'user'
    $.ajax({
      url: `https://api.github.com/users/${username}`,
      data: {
        client_id: 'b90af0c6f9a43cab7530',
        client_secret: '37c5f085da81419fd71428bcc0768cbad2fc0191',
      },
    }).done(function(user) {

      //Make ajax call to Github to retrieve 'repos'
      $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
          client_id: 'b90af0c6f9a43cab7530',
          client_secret: '37c5f085da81419fd71428bcc0768cbad2fc0191',
          sort: 'created: asc',
          per_page: 5,
        },
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $('#repos').append(`
            <div class="card card-body bg-light">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-info">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-outline-primary btn-block">Visit Repository</a>
                </div>
              </div>
            </div>
            `);
        });
      });
      $('#profile').html(`
        <div class="card">
          <div class="card-header">
            ${user.name}
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <img class="img-thumbnail img-fluid avatar mb-2" src="${user.avatar_url}">
                <a class="btn btn-outline-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-info">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-danger">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Login ID: ${user.login}</li>
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title">Latest Repos</h3>
            <div id="repos"></div>
          </div>
        </div>
        `);
    });
  });
});
