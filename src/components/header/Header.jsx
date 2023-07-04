import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";           //for calander
import 'react-date-range/dist/styles.css';              //main css file for calander
import 'react-date-range/dist/theme/default.css'        //theme css file for calander
import { format } from "date-fns"                         //for converting js date format to react
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {

    //setting destination
    const [destination, setDestination] = useState("")

    //To make calander visible on click
    const [openDate, setOpenDate] = useState(false)

    //for selecting date
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    //To make people adding option visible in click
    const [openOptions, setOpenOptions] = useState(false);

    //for adding people
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    //Counter function for increasing and decreasing people
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    //for sign in and register
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    //Context API
    const { dispatch } = useContext(SearchContext);

    //when search button is clicked navigate it to /hotels page
    const handleSearch = () => {
        //dispatch these payload data to all pages
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });

        navigate("/hotels", { state: { destination, dates, options } });
    }

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxis</span>
                    </div>
                </div>

                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
                        <p className="headerDesc">Get rewarded for your travel - unlock instant savings of 10% or more with a free Holiday Inn account</p>
                        {!user && <button className="headerBtn">Sign in / Register</button>}

                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)} />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className="date"
                                    minDate={new Date()}
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                                {openOptions && <div className="options">
                                    <div className="optionItems">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.adult}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItems">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItems">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.room <= 0} onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div> </>}
            </div>
        </div>
    );
}

export default Header
