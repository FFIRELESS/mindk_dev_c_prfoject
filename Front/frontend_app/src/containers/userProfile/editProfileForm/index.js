import {EditProfileForm} from "../../../components/userProfile/editProfileForm";
import {useParams} from "react-router-dom";

const EditProfileContainer = () => {
    const {id} = useParams();
    return (
        <>
            <EditProfileForm id={id}/>
        </>
    );
};

export default EditProfileContainer;