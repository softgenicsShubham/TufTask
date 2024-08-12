import axios, { AxiosResponse } from "axios";
import { SERVER_API_URL } from "../constants/constants";
import { BannerUpdateData } from "../types/BannerUpdateData";
import { BannerData } from "../types/BannerData";

interface ApiResponse<T> {
    success: boolean;
    payload: T;
}

const modifyBannerDetails = async (data: BannerUpdateData, bannerID: number): Promise<ApiResponse<BannerData>> => {
    const url: string = `${SERVER_API_URL}/banner/modifyBannerDetails/${bannerID}`;

    try {
        const result: AxiosResponse<ApiResponse<BannerData>> = await axios.put(url, data);
        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.message || 'Failed to modify banner details';
            console.error('Error modifying banner details:', errorMessage);
            throw new Error(`${errorMessage}`);
        } else {
            // Fallback for other types of errors
            const errorMessage = (error as Error).message || 'Unknown error occurred';
            throw new Error(errorMessage);
        }

    }
}

const getBannerDetails = async (bannerID: number): Promise<ApiResponse<BannerData>> => {
    const url: string = `${SERVER_API_URL}/banner/getBannerDetails/${bannerID}`;

    try {
        const result: AxiosResponse<ApiResponse<BannerData>> = await axios.get(url);
        return result.data;
    } catch (error) {
        console.error('Error fetching banner details:', error);
        throw new Error(`Failed to fetch banner details: ${(error as Error).message}`);
    }
}

export {
    modifyBannerDetails,
    getBannerDetails
}
