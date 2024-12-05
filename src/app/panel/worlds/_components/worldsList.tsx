import React from "react";
import { ListElement } from "./listElement";
import { World } from "@/types/world";
import { Map } from "lucide-react";

export default async function WorldsList() {
    try {
        const worldList: World[] = []; //await getSessionWorlds();

        if (worldList.length === 0) {
            return <div>No worlds found</div>;
        }
        return worldList.map((world) => (
            <ListElement
                name={world.name}
                description={world.description}
                icon={<Map />}
            />
        ));
    } catch (e) {
        return <div>Error loading worlds</div>;
    }
}
