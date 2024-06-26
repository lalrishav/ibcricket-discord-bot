import { Tournament } from "../dtos/tournament";

import fs from "fs";

export const ReadJsonFile = (filePath: string): any => {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData)
    }catch {
        throw new Error("internal server error")
    }
    
};

export const UpdateJsonFile = (filePath: string, data: any) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }catch {
        throw new Error("internal server error")
    }

};
