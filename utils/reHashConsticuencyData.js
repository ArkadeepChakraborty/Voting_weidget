export const reHashdata=(data)=>{
    console.log(data);
    data=data.replaceAll("<br/>","</br>")
    const dataList=data.split("</br>");
    console.log(dataList);
    const con_name=`${dataList[0].split(":")[1].trim()}`;
    const candidate_name=`${dataList[1].split(":")[1].trim()}`;
    const party=`${dataList[2].split(":")[1].trim()}`;
    const votes=`${dataList[3].split(":")[1].trim()}`;
    const vote_percentage=`${dataList[4].split(":")[1].trim()}`;
    const poll_vote=`${dataList[5].split(":")[1].trim()}`;
    const year=`${dataList[6].split(":")[1].trim()}`;
    return {con_name,candidate_name,party,votes,vote_percentage,poll_vote,year}
    
}