import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured = () => {

    //for returning city name with no. of hotel in the city
    const { data, loading, error } = useFetch("https://holiday-backend-tj0d.onrender.com/api/hotels/countByCity?cities=bhopal,indore,pune")

    return (
        <div className="featured">
            {loading ?
                ("loading please wait") :
                (<><div className="featuredItem">
                    <img className="featuredImg" src="https://i.pinimg.com/564x/09/f1/9f/09f19f8cb68c9600389adab501efa99c.jpg" alt="" />
                    <div className="featuredTitles">
                        <h1>Bhopal</h1>
                        <h2>{data[0]} Properties</h2>
                    </div>
                </div>

                    <div className="featuredItem">
                        <img className="featuredImg" src="https://i.pinimg.com/564x/67/6b/7f/676b7fdeefc00d4b87eb8dd2f341a78e.jpg" alt="" />
                        <div className="featuredTitles">
                            <h1>Indore</h1>
                            <h2>{data[1]} Properties</h2>
                        </div>
                    </div>

                    <div className="featuredItem">
                        <img className="featuredImg" src="https://i.pinimg.com/564x/34/c4/97/34c497c127aae9b88e97e54fcce29ca1.jpg" alt="" />
                        <div className="featuredTitles">
                            <h1>Pune</h1>
                            <h2>{data[2]} Properties</h2>
                        </div>
                    </div></>)}

        </div>)
}

export default Featured
