//File for single hotel
import "./hotel.css"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"


const Hotel = () => {
    //Getting the hotel id for last page
    const location = useLocation();
    //hotel id is stored as /hotels/649a77c40bfb7137cf4287db
    const id = location.pathname.split("/")[2]

    //for sliding the images on clicking a particular image
    const [slideNumber, setSlideNumber] = useState(0);

    //for opening slider window
    const [open, setOpen] = useState(false)

    //for reserving a hotel room
    const [openModal, setOpenModal] = useState(false)

    const { data, loading, error } = useFetch(`https://holiday-backend-tj0d.onrender.com/api/hotels/find/${id}`)

    //to check how many night user wants to stay
    const { dates, options } = useContext(SearchContext)

    const navigate = useNavigate()
    //importing user to reserve a hotel
    const { user } = useContext(AuthContext)

    //Counting no. of days for night stay
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
    const days = dayDifference(dates[0].endDate, dates[0].startDate)

    //to set the slider window on with a image
    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    }

    //to slide the image left or right
    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    }

    const handleClick = () => {
        if (user) {
            setOpenModal(true)
        } else {
            navigate("/login")
        }
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ?
                "loading" :
                (<div className="hotelContainer">
                    {open && <div className="slider">
                        <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
                        <div className="slideWrapper">
                            <img className="sliderImg" src={data.photos[slideNumber]} />
                        </div>
                        <FontAwesomeIcon icon={faCircleArrowRight} className="arrow arrow-right" onClick={() => handleMove("r")} />
                    </div>}
                    <div className="hotelWrapper">
                        <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
                        <div className="hotelTitle">{data.name}</div>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">
                            Excellent location - {data.distance}m from center
                        </span>
                        <span className="hotelPriceHighlight">
                            Book a stay over ₹{data.cheapestPrice} at this property and get a free taxi
                        </span>
                        <div className="hotelImages">
                            {data.photos?.map((photo, i) => (
                                <div className="hotelImgWrapper">
                                    <img src={photo} onClick={() => handleOpen(i)} className="hotelImg" />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data.title}</h1>
                                <p className="hotelDesc">
                                    {data.desc}
                                </p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days}-night stay!</h1>
                                <span>
                                    Couples particularly like the location — they rated it 8.7 for a two-person trip.
                                </span>
                                <h2>
                                    <b>₹{days * data.cheapestPrice * options.room}</b> ({days} nights)
                                </h2>
                                <button onClick={handleClick}>Reserve or Book Now!</button>
                            </div>
                        </div>
                    </div>
                    <MailList />
                    <Footer />
                </div>)}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    )
}

export default Hotel
