import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FestivalService from "../services/FestivalService";

function ViewFestivals() {
    const [festivals, setFestivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const loadData = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await FestivalService.getAllFestivals();
            setFestivals(response.data);
        } catch (requestError) {
            setError("We couldn't load the festivals. Check your connection and try again.");
            console.error("Unable to load festivals:", requestError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteFestival = async (id) => {
        if (!window.confirm("Are you sure you want to delete this festival?")) {
            return;
        }

        setDeletingId(id);
        setError("");

        try {
            await FestivalService.deleteFestival(id);
            await loadData();
        } catch (requestError) {
            setError("We couldn't delete that festival. Please try again.");
            console.error("Unable to delete festival:", requestError);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className="page-shell">
            <header className="page-heading">
                <div>
                    <div className="eyebrow">Your events, all in one place</div>
                    <h1 className="page-title">Festival collection</h1>
                    <p className="page-description">Keep the good times organized.</p>
                </div>
                <Link className="button-primary" to="/add">+ Add a festival</Link>
            </header>

            <section className="collection-card" aria-label="Festival collection">
                <div className="collection-toolbar">
                    <span className="collection-label">All festivals</span>
                    <span className="collection-count">
                        {festivals.length} {festivals.length === 1 ? "event" : "events"}
                    </span>
                </div>

                {error && (
                    <div className="form-message form-message-error" role="alert" style={{ margin: "16px 20px 0" }}>
                        {error}
                        {!loading && (
                            <button className="button-secondary button-small ms-3" onClick={loadData}>
                                Try again
                            </button>
                        )}
                    </div>
                )}

                {loading ? (
                    <div className="loading-state" role="status">Loading your festivals...</div>
                ) : festivals.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon" aria-hidden="true">♫</span>
                        <h2 className="empty-title">A little quiet around here</h2>
                        <p className="empty-copy">Add your first festival and get the calendar going.</p>
                        <Link className="button-primary" to="/add">Add your first festival</Link>
                    </div>
                ) : (
                    <div className="table-scroll">
                        <table className="festival-table">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Festival</th>
                                    <th scope="col">Venue</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Ticket price</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {festivals.map((festival) => (
                                    <tr key={festival.id}>
                                        <td className="festival-number">{String(festival.id).padStart(2, "0")}</td>
                                        <td className="festival-name">{festival.festivalName}</td>
                                        <td className="festival-venue">{festival.venue}</td>
                                        <td className="festival-date">{festival.eventDate}</td>
                                        <td className="festival-price">
                                            {new Intl.NumberFormat("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                                maximumFractionDigits: 2
                                            }).format(Number(festival.ticketPrice))}
                                        </td>
                                        <td>
                                            <div className="festival-actions">
                                                <Link
                                                    to={`/edit/${festival.id}`}
                                                    className="button-secondary button-small"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="button-danger button-small"
                                                    onClick={() => deleteFestival(festival.id)}
                                                    disabled={deletingId === festival.id}
                                                >
                                                    {deletingId === festival.id ? "Removing..." : "Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default ViewFestivals;
