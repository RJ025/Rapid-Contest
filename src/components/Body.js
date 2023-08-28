import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ContestList from "./ContestList";
import Loader from "./Loader";


const Body = () => {
    const [contest , setContest] = useState([]);
    let [filteredData , setFilteredData] = useState([]);

    const id = useParams();

    useEffect(()=>{
        getData();
    } , [])

    async function getData(){
        const data = await fetch("https://kontests.net/api/v1/all");
        const json = await data.json();
        setContest(json);
        setFilteredData(json);
    }
    if(id.site && contest.length !==0)
    {
        filteredData = contest.filter((c)=>{
            return c["site"]===id.site
        })
    }
    
    const currentContest = filteredData.filter((contest)=>{
        return contest.in_24_hours === 'Yes';
    })

    const futureContest = filteredData.filter((contest)=>{
        return contest.in_24_hours === 'No';
    })

    return (filteredData.length === 0)?<div className="flex justify-center items-center"><Loader/></div>: (
        <>
            <div className="mt-5">
                <div className="pr-10 pl-10" >
                    <h1 className="text-3xl p-5 font-bold">Running Contest</h1>
                    <ContestList filteredData = {currentContest}/>
                </div>  
                <div className="pr-10 pl-10">
                    <h1 className="text-3xl p-5  font-bold">Future contest</h1>
                    <ContestList filteredData= {futureContest}/>
                </div>
                
            </div>
            
        </>
    )
}

export default Body