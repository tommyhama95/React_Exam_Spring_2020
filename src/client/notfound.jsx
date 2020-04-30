import React from "react";

    /*** Self written code ***/

export class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    // Only renders if user requested a page not available
    render() {
        return(
            <div className={"notFound_container"}>
                <h2 className={"notFound_title"}>PAGE NOT FOUND</h2>
                <h5 className={"notFound_statuscode"}>404</h5>
                <div className={"notFound_error"}>
                    ERROR: The page requested is not available
                </div>
                <div className={"notFound_message"}>
                    Please try again or look for wished page from home page
                </div>
            </div>
        )
    }
}