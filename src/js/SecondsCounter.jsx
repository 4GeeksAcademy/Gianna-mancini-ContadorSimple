import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


const SecondsCounter = () => {
    const [timer, setTimer] = useState(0);
    const [active, setActive] = useState(false);
    const [countdown, setCountdown] = useState(false);
    const [input, setInput] = useState(0);
    const [alertAt, setAlertAt] = useState(10);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        let interval = null;
        if (active) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (countdown) {
                        return prev > 0 ? prev - 1 : 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [active, countdown]);

    useEffect(() => {
        if (active && alertAt !== null && timer === alertAt) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        }
    }, [timer, alertAt, active]);

    const handleStart = () => {
        setTimer(Number(input));
        setActive(true);
    };
    const handleReset = () => {
        setActive(false);
        setTimer(Number(input));
    };

    const digits = timer.toString().padStart(6, '0').split('');
    const digitStyle = {
        background: "#1c1c1c",
        color: "white",
        fontSize: "60px",
        padding: "10px",
        margin: "4px",
        borderRadius: "8px",
        minWidth: "75px"
    };

    return (
        <div className="container-fluid bg-black vh-100 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex mb-4">
                <div style={digitStyle}><i className="fa-regular fa-clock"></i></div>
                {digits.map((d, index) => (
                    <div key={index} style={digitStyle}>{d}</div>
                ))}
            </div>

            <div className="d-flex flex-wrap gap-2 mb-3 align-items-center justify-content-center">
                <input type="number" className="form-control form-control-sm w-auto" min="0" value={alertAt} onChange={e => setAlertAt(Number(e.target.value))} placeholder="Alerta en" disabled={active} />
                <select className="form-select form-select-sm w-auto" value={countdown ? "down" : "up"} onChange={e => setCountdown(e.target.value === "down") } disabled={active}>
                    <option value="up">Ascendente</option>
                    <option value="down">Regresivo</option>
                </select>
                {!active && <button className="btn btn-success btn-sm" onClick={handleStart}>Iniciar</button>}
            </div>

            <div className="btn-group">
                <button className="btn btn-outline-warning" onClick={() => setActive(a => !a)} disabled={timer === 0 && countdown}>
                    {active ? "Pausar" : "Resumir"}
                </button>
                <button className="btn btn-outline-danger" onClick={handleReset} disabled={!active}>
                    Reiniciar
                </button>
            </div>

            {showAlert && (
                <div className="alert alert-warning mt-3 py-2 px-3" role="alert">
                    ¡Alcanzaste el tiempo {alertAt}!
                </div>
            )}
        </div>
    );
};

export default SecondsCounter;
