import { useEffect, useState } from 'react';
import { useGetTopPlayersQuery } from '../../app/services/users/UserServicer'; // Используем RTK Query для получения топ-игроков
import { User } from '../../app/types'; // Импортируем тип User
import Title from '../../components/Title';
import TopPlayer from '../../components/TopPlayer';
import Player from '../../components/Player';
import Skeleton from 'react-loading-skeleton';

const Leaderboard = () => {
    const { data: users = [], error, isLoading } = useGetTopPlayersQuery(); // Используем RTK Query
    const [loading, setLoading] = useState(isLoading); // Устанавливаем состояние загрузки

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoading]);

    if (error) {
        console.error(error);
        return <div className="text-red-500">Ошибка загрузки данных</div>; // Обработка ошибок
    }

    return (
        <div className="flex flex-col items-center justify-center max-w-[360px] md:max-w-none z-50">
            <Title title="Leaderboard" />

            {!loading && users.length > 1 ? (
                <div className="flex gap-14 my-16">
                    <TopPlayer key={users[1].id} user={users[1]} rank={2} />
                    <TopPlayer key={users[0].id} user={users[0]} rank={1} />
                    <TopPlayer key={users[2].id} user={users[2]} rank={3} />
                </div>
            ) : (
                <div className="h-[330px]">
                    <Skeleton height={330} /> {/* Показать скелетон при загрузке */}
                </div>
            )}

            <div className="w-full overflow-x-auto max-w-4xl">
                <table className="min-w-full divide-y divide-gray-500">
                    <thead className="bg-[#19172d]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rank
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Winnings
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#19172d]">
                        {loading && (
                            <tr>
                                <td colSpan={3}>
                                    <Skeleton count={10} height={72} />
                                </td>
                            </tr>
                        )}

                        {!loading && users.slice(3).map((user: User, index: number) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    #{index + 4}
                                </td>
                                <td className="flex p-4 items-center gap-2">
                                    <Player user={user} size="small" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "DOL",
                                        maximumFractionDigits: 0,
                                    })
                                        .format(user.weeklyWinnings)
                                        .replace("DOL", "Руб")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;