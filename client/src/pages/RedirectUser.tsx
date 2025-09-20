
import { Loader } from "@/components/Loader";
import { useAppSelector } from "@/store";
import { Navigate } from "react-router-dom";

const RedirectAuthenticatedUser = ({ children }:{children:React.JSX.Element}) => {
	const { user,isLoggedIn,isLoading  } = useAppSelector((state)=>state.auth);

//    if(isLoading){
//        return (
//            <div className='absolute top-[50%] left-[50%] -translate-x-[-50%] -translate-y-[50%]'>
//                <Loader/>
//            </div>
//        )
//       }

	if (user && isLoggedIn) {
		return <Navigate to='/' replace />;
	}

	return children;
};

export default RedirectAuthenticatedUser