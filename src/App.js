import React from "react";
import "sass/App.scss";

// Transitions
import Fade from "react-reveal/Fade";

// Gravatar profile images
import Gravatar from "react-gravatar";

// Icons
import { GiTrophyCup } from "react-icons/gi";

import { Accordion, Button } from "react-bootstrap";

// Hooks
import useWindowDimensions from "useWindowDimensions";

function App() {
    const { width } = useWindowDimensions();
    const { hiscores } = require("osrs-json-api");
    let highscores = hiscores;
    const [players, setPlayers] = React.useState([{}]);
    const [loaded, setLoaded] = React.useState(false);
    const [attack, setAttack] = React.useState([{}]);
    const isEmpty = (str) => {
        return !str || 0 === str.length;
    };
    React.useEffect(() => {
        const playerArray = [
            {
                name: "svampefett",
                email: "lassespilling@gmail.com",
                image: "",
                knownFor: "Å motivere andre til å bli spillavhengige.",
            },
            {
                name: "walsibooy",
                email: "",
                image:
                    "https://media-exp1.licdn.com/dms/image/C5603AQHWSQ4YaYL-6Q/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=Ks_bSTJZu8le4aykY4Usk4ZU_nTNa2OO-bS0DlhTDkA",
                knownFor:
                    "Bruke timesvis på å tjene gull istedenfor å gå ned en grandis i måneden.",
            },
            {
                name: "ingejj",
                email: "",
                image:
                    "https://media-exp1.licdn.com/dms/image/C5603AQGrtLvMzXbVpg/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=2UCU-zsqSPB4HpM2PdPfW2nZ8eB0kMqtvETNztllBCk",
                knownFor:
                    "Spille AFK på mobil mens han lytter til smooth jazz.",
            },
            {
                name: "liss123",
                email: "",
                image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyxqtQ7aFpikewNlUK2TvAGvlemq5jucclWg&usqp=CAU",
                knownFor:
                    "Spille AFK på mobil mens han soler seg på terassen mens han klør mellom fingrene på grunn av stadig bruk av Mudin.",
            },
        ];
        for (let i = 0; i < playerArray.length; i++) {
            highscores.getPlayer(playerArray[i].name).then((result) => {
                let newPlayer = {
                    skills: result.skills,
                    playerName: playerArray[i].name,
                    email: playerArray[i].email,
                    image: playerArray[i].image,
                    knownFor: playerArray[i].knownFor,
                };
                setPlayers((players) => [...players, newPlayer]);
                setAttack((attack) => [...attack, newPlayer.skills.attack]);
            });
        }
    }, [highscores]);
    React.useEffect(() => {
        if (players.length > 1 && !loaded) {
            setLoaded(true);
        }
    }, [players, loaded]);
    React.useEffect(() => {
        console.log(attack);
    }, [attack]);
    // React.useEffect(
    //     function () {
    //         if (players.length > 0) {
    //             players[0].achievements = { over500total: true };
    //         }
    //     },
    //     [players]
    // );

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const showPlayer = (playerObject, parentIndex) => {
        let name = playerObject.playerName;
        let knownFor = playerObject.knownFor;
        let email = playerObject.email;
        let skills = playerObject.skills;
        let image = playerObject.image;
        let getImage = () => {
            if (!isEmpty(email)) {
                return <Gravatar email={email} size="70" />;
            } else if (!isEmpty(image)) {
                return (
                    <img
                        alt={name}
                        src={image}
                        style={{
                            height: 70,
                            width: 70,
                            objectFit: "cover",
                        }}
                    />
                );
            } else {
                return null;
            }
        };
        return (
            <Fade>
                <div
                    className="d-block d-xl-flex flex-column px-4 mb-4"
                    style={{ maxWidth: width < 1000 ? "100vw" : "300px" }}
                >
                    <div className="bg-light text-dark d-flex justify-content-between pl-3 align-items-center">
                        <h1
                            className="sticky text-center mb-0"
                            key={`player-name-${parentIndex}`}
                        >
                            {name}
                        </h1>
                        {getImage()}
                    </div>
                    <div className="dark text-white py-4 text-left">
                        <div className="mb-4" style={{ minHeight: 150 }}>
                            <h2 className="text-uppercase text-warning">
                                Kjent for:
                            </h2>
                            <ul className="list-style-none mb-0 d-flex justify-content-center flex-column p-0">
                                <li>{knownFor}</li>
                            </ul>
                        </div>
                        <h2 className="text-uppercase text-warning">
                            Achievements:
                        </h2>
                        <ul className="list-style-none mb-0 d-flex justify-content-center flex-column p-0">
                            {skills &&
                                Object.entries(skills).map(
                                    ([key, value], index) => {
                                        let lvl = parseInt(value.level);
                                        return (
                                            <>
                                                {key === "overall" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 500
                                                                    ? "rock"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            500 total lvl
                                                        </li>
                                                        <li
                                                            className={
                                                                lvl >= 800
                                                                    ? "bronze"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            800 total lvl
                                                        </li>
                                                        <li
                                                            className={
                                                                lvl >= 1200
                                                                    ? "silver"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            1200 total lvl
                                                        </li>
                                                        <li
                                                            className={
                                                                lvl >= 1500
                                                                    ? "gold"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            1500 total lvl
                                                        </li>
                                                        <li
                                                            className={
                                                                lvl >= 2000
                                                                    ? "platinum"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            2000 total lvl
                                                        </li>
                                                        <hr />
                                                    </>
                                                )}
                                                {key === "attack" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 60
                                                                    ? "text-attack"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            Kan bruke rune våpen
                                                        </li>
                                                    </>
                                                )}
                                                {key === "defence" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 60
                                                                    ? "text-defence"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            Kan gå med rune
                                                            rustning
                                                        </li>
                                                    </>
                                                )}
                                                {key === "prayer" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 45
                                                                    ? "text-prayer"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            Har alle protect
                                                            prayers
                                                        </li>
                                                    </>
                                                )}
                                                {key === "firemaking" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 50
                                                                    ? "text-firemaking"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            Relativt god til å
                                                            tenne bål.
                                                        </li>
                                                    </>
                                                )}
                                                {key === "fishing" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 16
                                                                    ? "text-fishing"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            Kan fiske med stort
                                                            nett
                                                        </li>
                                                    </>
                                                )}
                                                {key === "woodcutting" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 45
                                                                    ? "text-woodcutting"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            Kan hogge ned
                                                            lønnetrær
                                                        </li>
                                                    </>
                                                )}
                                                {key === "smithing" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 40
                                                                    ? "text-smithing"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            Kan smelte ned gull
                                                        </li>
                                                    </>
                                                )}
                                                {key === "cooking" && (
                                                    <>
                                                        <li
                                                            className={
                                                                lvl >= 40
                                                                    ? "text-cooking"
                                                                    : "text-muted not-unlocked"
                                                            }
                                                        >
                                                            <GiTrophyCup className="mr-3" />
                                                            Kan diske opp med
                                                            stekt hummer
                                                        </li>
                                                    </>
                                                )}
                                            </>
                                        );
                                    }
                                )}
                        </ul>
                    </div>
                    <Accordion defaultActiveKey={width > 1000 ? "1" : "0"}>
                        <Accordion.Toggle
                            as={Button}
                            variant="primary"
                            eventKey="1"
                        >
                            Vis mine stats
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <table key={`table-${parentIndex}`}>
                                <tbody key={`table-body-${parentIndex}`}>
                                    {skills &&
                                        Object.entries(skills).map(
                                            ([key, value], index) => (
                                                <tr key={`row-${index}`}>
                                                    <th
                                                        key={`skill-name-${index}`}
                                                        className="d-flex align-items-center"
                                                    >
                                                        {key !== "overall" && (
                                                            <div
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                }}
                                                                className="mr-3 rounded-circle overflow-hidden position-relative"
                                                            >
                                                                <img
                                                                    alt={`skill-icon_${key}`}
                                                                    src={require(`img/RS_Icons_${capitalize(
                                                                        key
                                                                    )}.jpg`)}
                                                                    className=" absolute-center"
                                                                    style={{
                                                                        width: 100,
                                                                        height: 100,
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        {key}
                                                    </th>
                                                    <td
                                                        key={`skill-level-${index}`}
                                                        className="text-center"
                                                    >
                                                        {value.level}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </Accordion.Collapse>
                    </Accordion>
                </div>
            </Fade>
        );
    };
    let playerSkillTable = players.map(
        (player, index) => index > 0 && showPlayer(player, index)
    );
    return (
        <main className="py-5">
            <h1 className="text-center mb-4 py-3">OSRS - Team Søgne</h1>
            <div className="d-block d-md-flex justify-content-center">
                {loaded ? (
                    playerSkillTable
                ) : (
                    <Fade>
                        <img
                            alt="loading"
                            src="https://i.makeagif.com/media/4-19-2016/jclhrB.gif"
                            style={{ maxWidth: "100vw" }}
                            className="mx-auto d-block"
                        />
                    </Fade>
                )}
            </div>
        </main>
    );
}

export default App;

// USING just API
// const [players, setPlayers] = React.useState([{}]);
// const fetchStats = (player) => {
//     return axios
//         .get(
//             `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${player}`
//         )
//         .then((d) => d.data);
// };
// const setStats = (player, playerFunction) => {
//     fetchStats(player).then((data) => {
//         let stats = data.split(",");
//         playerFunction({
//             attack: stats[3],
//             defence: stats[5],
//             strength: stats[7],
//             constitution: stats[9],
//             ranged: stats[11],
//             prayer: stats[13],
//             magic: stats[15],
//             cooking: stats[17],
//             woodcutting: stats[19],
//             fletching: stats[21],
//             fishing: stats[23],
//             firemaking: stats[25],
//             crafting: stats[27],
//             smithing: stats[29],
//             mining: stats[31],
//             herblore: stats[33],
//             agility: stats[35],
//             thieving: stats[37],
//             slayer: stats[39],
//             farming: stats[41],
//             runecrafting: stats[43],
//             hunter: stats[45],
//             construction: stats[47],
//         });
//     });
// };
