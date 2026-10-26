import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FestivalService from "../services/FestivalService";

function EditFestival() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [festival, setFestival] = useState({
        festivalName: "",
        venue: "",
        eventDate: "",
        ticketPrice: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadFestival = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await FestivalService.getFestivalById(id);
                setFestival(response.data);
            } catch (requestError) {
                setError("We couldn't load this festival. Please try again.");
                console.error("Unable to load festival:", requestError);
            } finally {
                setLoading(false);
            }
        };

        loadFestival();
    }, [id]);

    const handleChange = (event) => {
        setFestival({
            ...festival,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            await FestivalService.updateFestival(id, festival);
            navigate("/");
        } catch (requestError) {
            setError("We couldn't save your changes. Please try again.");
            console.error("Unable to update festival:", requestError);
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="page-shell form-layout">
            <div className="form-card">
                <header className="form-header">
                    <div className="eyebrow">Plans change, that’s okay</div>
                    <h1 className="page-title">Edit festival</h1>
                    <p className="page-description">Update the details for this event.</p>
                </header>

                {error && <div className="form-message form-message-error" role="alert">{error}</div>}

                {loading ? (
                    <div className="loading-state" role="status">Loading festival details...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-field">
                                <label className="form-label" htmlFor="festivalName">Festival name</label>
                                <input
                                    id="festivalName"
                                    type="text"
                                    className="form-input"
                                    name="festivalName"
                                    value={festival.festivalName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label" htmlFor="venue">Venue</label>
                                <input
                                    id="venue"
                                    type="text"
                                    className="form-input"
                                    name="venue"
                                    value={festival.venue}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label" htmlFor="eventDate">Event date</label>
                                <input
                                    id="eventDate"
                                    type="text"
                                    className="form-input"
                                    name="eventDate"
                                    value={festival.eventDate}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="form-help">Use the date format DD-MM-YYYY.</span>
                            </div>

                            <div className="form-field">
                                <label className="form-label" htmlFor="ticketPrice">Ticket price</label>
                                <input
                                    id="ticketPrice"
                                    type="number"
                                    className="form-input"
                                    name="ticketPrice"
                                    value={festival.ticketPrice}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <Link className="button-secondary" to="/">Cancel</Link>
                            <button className="button-primary" type="submit" disabled={saving}>
                                {saving ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}

export default EditFestival;
