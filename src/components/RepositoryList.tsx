export function RepositoryList({ repos }) {
  return (
    <div>
      {repos.map(repo => (
        <div key={repo.id}>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          ⭐ {repo.stargazers_count}
        </div>
      ))}
    </div>
  );
}
