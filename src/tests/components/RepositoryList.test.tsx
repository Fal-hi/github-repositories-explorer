import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RepositoryList } from "@/components/RepositoryList";
import { getUserRepos } from "@/hooks/useGithubApi";

vi.mock("@/hooks/useGithubApi", () => ({
  getUserRepos: vi.fn(),
}));

// Dummy user
const mockUsers = [
  {
    login: "octocat",
    id: 1,
    node_id: "",
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "",
    user_view_type: "",
    site_admin: false,
  },
];

// Dummy repo
const mockRepos = [
  {
    id: 100,
    name: "awesome-repo",
    html_url: "https://github.com/octocat/awesome-repo",
    description: "An awesome repo",
    stargazers_count: 42,
    node_id: "",
    full_name: "",
    private: false,
    owner: {
      login: "",
      id: 0,
      node_id: "",
      avatar_url: "",
      gravatar_id: "",
      url: "",
      html_url: "",
      followers_url: "",
      following_url: "",
      gists_url: "",
      starred_url: "",
      subscriptions_url: "",
      organizations_url: "",
      repos_url: "",
      events_url: "",
      received_events_url: "",
      type: "",
      user_view_type: "",
      site_admin: false,
    },
    fork: false,
    url: "",
    forks_url: "",
    keys_url: "",
    collaborators_url: "",
    teams_url: "",
    hooks_url: "",
    issue_events_url: "",
    events_url: "",
    assignees_url: "",
    branches_url: "",
    tags_url: "",
    blobs_url: "",
    git_tags_url: "",
    git_refs_url: "",
    trees_url: "",
    statuses_url: "",
    languages_url: "",
    stargazers_url: "",
    contributors_url: "",
    subscribers_url: "",
    subscription_url: "",
    commits_url: "",
    git_commits_url: "",
    comments_url: "",
    issue_comment_url: "",
    contents_url: "",
    compare_url: "",
    merges_url: "",
    archive_url: "",
    downloads_url: "",
    issues_url: "",
    pulls_url: "",
    milestones_url: "",
    notifications_url: "",
    labels_url: "",
    releases_url: "",
    deployments_url: "",
    created_at: "",
    updated_at: "",
    pushed_at: "",
    git_url: "",
    ssh_url: "",
    clone_url: "",
    svn_url: "",
    homepage: undefined,
    size: 0,
    watchers_count: 0,
    language: "",
    has_issues: false,
    has_projects: false,
    has_downloads: false,
    has_wiki: false,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    mirror_url: undefined,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: undefined,
    allow_forking: false,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: "",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "",
  },
];

describe("RepositoryList", () => {
  it("renders user accordion list", () => {
    render(<RepositoryList users={mockUsers} />);
    expect(screen.getByText("octocat")).toBeInTheDocument();
    expect(screen.queryByText("awesome-repo")).not.toBeInTheDocument();
  });

  it("fetches and displays repositories on accordion open", async () => {
    (getUserRepos as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockRepos);
    render(<RepositoryList users={mockUsers} />);

    fireEvent.click(screen.getByText("octocat"));

    await waitFor(() => {
      expect(screen.getByText("awesome-repo")).toBeInTheDocument();
      expect(screen.getByText("An awesome repo")).toBeInTheDocument();
    });
  });

  it("shows fallback when no repos are found", async () => {
    (getUserRepos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]);

    render(<RepositoryList users={mockUsers} />);
    fireEvent.click(screen.getByText("octocat"));

    await waitFor(() => {
      expect(screen.getByText(/No repositories found./i)).toBeInTheDocument();
    });
  });

  it("handles fetch error gracefully", async () => {
    (getUserRepos as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("API error")
    );

    render(<RepositoryList users={mockUsers} />);
    fireEvent.click(screen.getByText("octocat"));

    await waitFor(() => {
      expect(screen.getByText(/No repositories found./i)).toBeInTheDocument();
    });
  });
});
