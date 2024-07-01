import "./MemoryGame.css";
import { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { arrayImages, keyArrayImages } from "./images";
import imgQ from "../../../images/download.png"
import { PlayingCard } from "../../../Models/Models";
import _ from "lodash";
import toastContext from "../../../Context/ToastContext/ToastContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { HeaderOption } from "../../Pages/MemoryGamePage";

interface IPropsMemoryGame {
    subject: HeaderOption;
    setSubject: Dispatch<SetStateAction<HeaderOption>>;
}


export function MemoryGame(props: IPropsMemoryGame): JSX.Element {

    const [arrayOfPlayingCard, setArrayOfPlayingCard] = useState<PlayingCard[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [timeTheGame, setTimeTheGame] = useState({
        startTime: 0, minuets: 0, seconds: 0
    });

    const toast = useContext(toastContext);

    const count = useRef<number>(0);

    const { subject, setSubject } = props;

    console.log(subject)

    const checkSameImages = (index: number, arr: PlayingCard[]) => {
        const imageName: string = arr[index].imageName;
        let checkFinishedGame = true;
        let indexOfSameImage: number | undefined = undefined;
        // console.log(index, arr[index].watch)
        for (let i = 0; i < arr.length; i++) {
            if (i != index && imageName === arr[i].imageName && arr[i].watch) {
                indexOfSameImage = i;
                // toast?.current?.success('Is same!!!');
                toast?.current?.show({ severity: 'success', summary: 'Bravo', detail: 'Is same!!!', life: 3000 })
                console.log("is same!!!!!");
            }
            if (!arr[i].watch) checkFinishedGame = false;
        }
        if (checkFinishedGame) {
            // const time = {...timeTheGame, endTime:new Date().getTime()}
            const endTime = new Date().getTime();
            const time = (endTime - timeTheGame.startTime) / 1000;
            const minuets = Math.floor(time / 60);
            const seconds = Math.floor(time - (minuets * 60));
            // console.log(timeTheGame.startTime, endTime, time, minuets, seconds)
            setTimeTheGame({ startTime: timeTheGame.startTime, minuets, seconds });
            setVisible(true);
            setSubject({ name: 'persons', code: 'OPT3' })
        }
        // console.log("in finished function checkSameImages")
        return indexOfSameImage;
    }

    const turnOverTheImages = (index: number, arr: PlayingCard[]) => {
        count.current++;
        if (count.current === 2) {
            // console.log("------------")
            const indexOfSameImage = checkSameImages(index, arr);
            // console.log(indexOfSameImage ? "i finished function checkSameImages" : "aaa", indexOfSameImage);
            setTimeout(() => {
                // console.log("i`m in timeout")
                if (indexOfSameImage) {
                    arr[index].outTheGame = true;
                    arr[indexOfSameImage].outTheGame = true;
                }
                for (let index = 0; index < arr.length; index++) {
                    if (!arr[index].outTheGame) {
                        arr[index].watch = false;
                    }
                }
                setArrayOfPlayingCard(_.cloneDeep(arr))
                count.current = 0;
                // console.log("------------")
            }, 1500);
        }
    }

    const footerContent = (
        <div>
            <Button label="Ok" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );


    useEffect(() => {
        const arr: PlayingCard[] = [];
        for (let i = 0; i < 10; i++) {
            //add win key to all the time show image
            arr.push({ ...arrayImages[subject.name as keyArrayImages][i] });
            arr.push({ ...arrayImages[subject.name as keyArrayImages][i] });
        }
        setArrayOfPlayingCard(_.shuffle(arr));
    }, [subject]);

    console.log()
    return (
        <div className="MemoryGame full row justify-content-center mb-5 px-2">
            <Dialog visible={visible} modal header="Congratulations" footer={footerContent} style={{ width: '50vw', height: "50vh" }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <p className="m-0">
                    You win the Game!<br />
                    it takes 0:{timeTheGame.minuets < 10 ? `0${timeTheGame.minuets}` : timeTheGame.minuets}:
                    {timeTheGame.seconds < 10 ? `0${timeTheGame.seconds}` : timeTheGame.seconds}
                </p>
            </Dialog>
            <div className="border rounded row col-6 bg-body-tertiary m-2 containerPlayingCard">
                {arrayOfPlayingCard?.map((el: PlayingCard, index) => (
                    <div className={"rounded p-2 col-3 "} key={index} onClick={(e: MouseEvent) => {
                        e.preventDefault();
                        if (timeTheGame.startTime === 0) timeTheGame.startTime = new Date().getTime();
                        if (!el.watch && count.current < 2 && !el.outTheGame) {
                            const arr = _.cloneDeep(arrayOfPlayingCard)
                            arr[index].watch = true;
                            setArrayOfPlayingCard(arr)
                            // console.log("im in on click", index, arr)
                            turnOverTheImages(index, arr);
                        }
                        // console.log(array.current, array.current[length] != index)
                    }}>
                        {el.outTheGame ? <div className="rounded bg-white" style={{ height: window.innerWidth > 960 ? '100px' : "50px", width: '100%' }}></div>
                            : <img className="border rounded boxShadow" src={el.watch ? el.image : imgQ} height={window.innerWidth > 960 ? '100px' : "50px"} width={'100%'} />}
                    </div>
                ))}
            </div>
        </div>
    );
}
