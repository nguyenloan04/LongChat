import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { clearToastMessage } from "@/redux/slices/socketSlice";

export const ClearToastComponent = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(clearToastMessage());
    }, [location.pathname, dispatch]);

    return <Outlet />;
};