export function UserDropdown({ users, onSelect }: unknown) {
  return (
    <select onChange={e => onSelect(e.target.value)}>
      {users.map(user => <option key={user.id}>{user.login}</option>)}
    </select>
  );
}
