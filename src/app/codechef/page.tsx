import axios from "axios";
interface Contest {
  contest_code: string;
  contest_name: string;
}
export default async function Codechef() {
  const fetchFutureContests = async () => {
    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"
    );
    return response.data.future_contests;
  };
  const fetchPastContests = async () => {
    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"
    );
    return response.data.past_contests;
  };
  const fetchPresentContests = async () => {
    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"
    );
    return response.data.practice_contests;
  };
  const futureContests = await fetchFutureContests();
  const pastContests = await fetchPastContests();
  const presentContests = await fetchPresentContests();
  return (
    <div>
      <h1>Future</h1>
      {futureContests.map((contest: Contest) => {
        return (
          <div key={contest.contest_code}>
            <span>{contest.contest_code}</span>
            <span>{contest.contest_name}</span>
          </div>
        );
      })}
      <h1>Past</h1>
      {pastContests?.map((contest: Contest) => {
        return (
          <div key={contest.contest_code}>
            <span>{contest.contest_code}</span>
            <span>{contest.contest_name}</span>
          </div>
        );
      })}
      <h1>Present</h1>
      {presentContests.length > 0 ? (
        presentContests.map((contest: Contest) => {
          return (
            <div key={contest.contest_code}>
              <span>{contest.contest_code}</span>
              <span>{contest.contest_name}</span>
            </div>
          );
        })
      ) : (
        <div> not available</div>
      )}
    </div>
  );
}
