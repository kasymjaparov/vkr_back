require("dotenv").config()
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: "dtnnz5kjh",
    api_key: "991985292946139",
    api_secret: "DsuE1pgxytLMuDB5BR3-tR_N3Ms"

})
export default cloudinary