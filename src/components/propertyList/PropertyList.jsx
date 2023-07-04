import useFetch from "../../hooks/useFetch"
import "./propertyList.css"

const PropertyList = () => {

    //data for displaying different types of hotel count
    const { data, loading, error } = useFetch("/hotels/countByType");

    //array of images
    const images = [
        "https://i.pinimg.com/564x/22/5e/be/225ebe6849b5714561c783f995167008.jpg",
        "https://i.pinimg.com/564x/a2/fe/08/a2fe0876467e23c27eee0f1cc9aead51.jpg",
        "https://i.pinimg.com/564x/1b/0f/5a/1b0f5a74638b8201cc78f46ffd3e971b.jpg",
        "https://i.pinimg.com/564x/68/0f/1e/680f1e118017cf2917867b4f2b974322.jpg",
        "https://i.pinimg.com/564x/37/a2/41/37a24136c1b87d8647dd52ee68b548a5.jpg",
    ];
    return (
        <div className="pList">
            {loading ?
                ("loading") :
                (<>
                    {data && images.map((img, i) => (<div className="pListItem" key={i} >
                        <img className="pListImg" src={img} alt="" />
                        <div className="pListTitles">
                            <h1>{data[i]?.type}</h1>
                            <h2>{data[i]?.count} {data[i]?.type}</h2>
                        </div>
                    </div>
                    ))}
                </>)}
        </div>
    )
}

export default PropertyList
