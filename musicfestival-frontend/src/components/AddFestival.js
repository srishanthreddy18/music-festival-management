import { useState } from "react";
import { Link } from "react-router-dom";
import FestivalService from "../services/FestivalService";

const emptyFestival = {
    festivalName: "",
    venue: "",
    eventDate: "",
    ticketPrice: ""
};

function AddFestival() {
    const [festival, setFestival] = useState(emptyFestival);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        setSuccess("");

        try {
            await FestivalService.addFestival(festival);
            setFestival({ ...emptyFestival });
            setSuccess("Festival added — your next good time is on the calendar.");
        } catch (requestError) {
            setError("We couldn't add this festival. Please check the details and try again.");
            console.error("Unable to add festival:", requestError);
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="page-shell form-layout">
            <div className="form-card">
                <header className="form-header">
                    <div className="eyebrow">Make room for a good time</div>
                    <h1 className="page-title">Add a festival</h1>
                    <p className="page-description">A few details and it’s on the books.</p>
                </header>

                {error && <div className="form-message form-message-error" role="alert">{error}</div>}
                {success && <div className="form-message form-message-success" role="status">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-field">
                            <label className="form-label" htmlFor="festivalName">Festival name</label>
                            <input
                                id="festivalName"
                                type="text"
                                className="form-input"
                                placeholder="e.g. Summer Sounds"
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
                                placeholder="Where’s it happening?"
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
                                placeholder="e.g. 21-10-2026"
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
                                placeholder="0.00"
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
                            {saving ? "Adding..." : "Add festival"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default AddFestival;
