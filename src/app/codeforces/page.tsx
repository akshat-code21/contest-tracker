import axios from "axios"
interface Contest{
    id : number;
    name : string
}
export default async function Codeforces() {
    const fetchContests = async () => {
        const response = await axios.get("https://codeforces.com/api/contest.list");
        return response.data.result;
    }
    const contests = await fetchContests();
    return (
        <div>
            {contests.map((contest:Contest)=>{
                return(
                    <div key={contest.id}>
                        <div>{contest.id}</div>
                        <div>{contest.name}</div>
                    </div>
                )
            })}
        </div>
    )
}