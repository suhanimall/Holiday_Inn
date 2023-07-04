import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (url) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    //whenever url change perfrom the following function
    useEffect(() => {
        //For fetching the data
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url)              //axios is used to fetch url
                setData(res.data);
            } catch (err) {
                setError(err)
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    //For re-fetching data again
    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err)
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch }
};

export default useFetch;