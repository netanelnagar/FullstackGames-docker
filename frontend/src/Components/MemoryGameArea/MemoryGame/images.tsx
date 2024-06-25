import fruits1 from "../../../images/fruits1.jpg"
import fruits2 from "../../../images/fruits2.jpg"
import fruits3 from "../../../images/fruits3.jpg"
import fruits4 from "../../../images/fruits4.jpg"
import fruits5 from "../../../images/fruits5.jpg"
import fruits6 from "../../../images/fruits6.jpg"
import fruits7 from "../../../images/fruits7.webp"
import fruits8 from "../../../images/fruits8.jpg"
import fruits9 from "../../../images/fruits9.jpg"
import fruits10 from "../../../images/fruits10.jpg"
import animals1 from "../../../images/animals1.jpg"
import animals2 from "../../../images/animals2.jpg"
import animals3 from "../../../images/animals3.jpg"
import animals4 from "../../../images/animals4.jpg"
import animals5 from "../../../images/animals5.jpg"
import animals6 from "../../../images/animals6.jpg"
import animals7 from "../../../images/animals7.jpg"
import animals8 from "../../../images/animals8.jpg"
import animals9 from "../../../images/animals9.jpg"
import animals10 from "../../../images/animals10.jpg"
import vehicle1 from "../../../images/vehicle1.jpg"
import vehicle2 from "../../../images/vehicle2.jpg"
import vehicle3 from "../../../images/vehicle3.jpg"
import vehicle4 from "../../../images/vehicle4.jpg"
import vehicle5 from "../../../images/vehicle5.jpg"
import vehicle6 from "../../../images/vehicle6.jpg"
import vehicle7 from "../../../images/vehicle7.jpg"
import vehicle8 from "../../../images/vehicle8.jpg"
import vehicle9 from "../../../images/vehicle9.jpg"
import vehicle10 from "../../../images/vehicle10.jpg"
import persons1 from "../../../images/person1.jpg"
import persons2 from "../../../images/person2.jpg"
import persons3 from "../../../images/person3.jpg"
import persons4 from "../../../images/person4.jpg"
import persons5 from "../../../images/person5.jpg"
import persons6 from "../../../images/person6.jpg"
import persons7 from "../../../images/person7.jpg"
import persons8 from "../../../images/person8.jpg"
import persons9 from "../../../images/person9.jpg"
import persons10 from "../../../images/person10.jpg"
import { PlayingCard } from "../../../../Models/Models"

type IArrayImages = {
    fruits: PlayingCard[],
    animals: PlayingCard[],
    persons: PlayingCard[],
    vehicle: PlayingCard[]
}


export const arrayImages: IArrayImages = {
    fruits: [
        { image: fruits1, imageName: "fruits1", outTheGame: false, watch: false },
        { image: fruits2, imageName: "fruits2", outTheGame: false, watch: false },
        { image: fruits3, imageName: "fruits3", outTheGame: false, watch: false },
        { image: fruits4, imageName: "fruits4", outTheGame: false, watch: false },
        { image: fruits5, imageName: "fruits5", outTheGame: false, watch: false },
        { image: fruits6, imageName: "fruits6", outTheGame: false, watch: false },
        { image: fruits7, imageName: "fruits7", outTheGame: false, watch: false },
        { image: fruits8, imageName: "fruits8", outTheGame: false, watch: false },
        { image: fruits9, imageName: "fruits9", outTheGame: false, watch: false },
        { image: fruits10, imageName: "fruits10", outTheGame: false, watch: false }
    ],
    animals: [
        { image: animals1, imageName: "animals1", outTheGame: false, watch: false },
        { image: animals2, imageName: "animals2", outTheGame: false, watch: false },
        { image: animals3, imageName: "animals3", outTheGame: false, watch: false },
        { image: animals4, imageName: "animals4", outTheGame: false, watch: false },
        { image: animals5, imageName: "animals5", outTheGame: false, watch: false },
        { image: animals6, imageName: "animals6", outTheGame: false, watch: false },
        { image: animals7, imageName: "animals7", outTheGame: false, watch: false },
        { image: animals8, imageName: "animals8", outTheGame: false, watch: false },
        { image: animals9, imageName: "animals9", outTheGame: false, watch: false },
        { image: animals10, imageName: "animals10", outTheGame: false, watch: false }
    ],
    persons: [
        { image: persons1, imageName: "persons1", outTheGame: false, watch: false },
        { image: persons2, imageName: "persons2", outTheGame: false, watch: false },
        { image: persons3, imageName: "persons3", outTheGame: false, watch: false },
        { image: persons4, imageName: "persons4", outTheGame: false, watch: false },
        { image: persons5, imageName: "persons5", outTheGame: false, watch: false },
        { image: persons6, imageName: "persons6", outTheGame: false, watch: false },
        { image: persons7, imageName: "persons7", outTheGame: false, watch: false },
        { image: persons8, imageName: "persons8", outTheGame: false, watch: false },
        { image: persons9, imageName: "persons9", outTheGame: false, watch: false },
        { image: persons10, imageName: "persons10", outTheGame: false, watch: false }
    ],
    vehicle: [
        { image: vehicle1, imageName: "vehicle1", outTheGame: false, watch: false },
        { image: vehicle2, imageName: "vehicle2", outTheGame: false, watch: false },
        { image: vehicle3, imageName: "vehicle3", outTheGame: false, watch: false },
        { image: vehicle4, imageName: "vehicle4", outTheGame: false, watch: false },
        { image: vehicle5, imageName: "vehicle5", outTheGame: false, watch: false },
        { image: vehicle6, imageName: "vehicle6", outTheGame: false, watch: false },
        { image: vehicle7, imageName: "vehicle7", outTheGame: false, watch: false },
        { image: vehicle8, imageName: "vehicle8", outTheGame: false, watch: false },
        { image: vehicle9, imageName: "vehicle9", outTheGame: false, watch: false },
        { image: vehicle10, imageName: "vehicle10", outTheGame: false, watch: false }
    ],
}


export type keyArrayImages = keyof IArrayImages;