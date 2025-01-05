import { Link } from "react-router-dom";
import Title from "../../components/Title";

interface GameListingProps {
    name: string;
    description?: string;
}

const GameListing: React.FC<GameListingProps> = ({
    name,
    description,
}) => {

    const games = [
        {
            id: "1",
            title: "Crash",
            image: "",
            link: "/crash"
        },
        {
            id: "2",
            title: "CoinFlip",
            image: "",
            link: "/coinflip"
        }, {
            id: "3",
            title: "Upgrade",
            image: "",
            link: "/upgrade"
        },
        {
            id: "4",
            title: "Slot",
            image: "",
            link: "/slot"
        },
    ]
    return (
        <div className="w-full flex flex-col gap-4 py-10 items-center" key={name}>
            <div className="flex flex-col items-center justify-center max-w-[1600px]">
                <Title title={name} />
                {description && <div className="text">{description}</div>}
                {
                    <div className="flex flex-col md:flex-row items-center w-full justiy-center gap-8 flex-wrap">
                        {
                            games.map((item: any) => (
                                <Link to={item.link} key={item.id}>
                                    <div className="flex flex-col">
                                        <img src={item.image} alt={item.title} className="w-[256px] h-[348px] object-contain" />
                                        <div className="text text-center">Play {item.title}</div>

                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default GameListing;