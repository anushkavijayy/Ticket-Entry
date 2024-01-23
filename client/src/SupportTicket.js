import React, { useEffect, useState } from "react";

const SupportTicket = () => {
  const [agents, setAgents] = useState([]);
  const [formdata, setFormdata] = useState({
    topic: "",
    desc: "",
    type: "",
    assignedTo: agents.length > 0 ? agents[0]._id : null,
  });

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/fetch-agents");
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        const agentsData = await res.json();
        setAgents(agentsData);
        setFormdata((prevFormdata) => ({
          ...prevFormdata,
          assignedTo: agentsData.length > 0 ? agentsData[0]._id : null,
        }));
      } catch (err) {
        console.error("error fetching agents", err);
      }
    };

    fetchAgents();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleChange = (e) => {
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/ticket", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (!res.ok) {
        console.error(`${res.status} ${res.statusText}`);
        return;
      }
      const resData = await res.json();
      console.log("ticket created");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Topic :</label>
      <input
        type="text"
        name="topic"
        value={formdata.topic}
        onChange={handleChange}
      ></input>
      <label>Assigned To :</label>
      <select name = "assignedTo" value = {formdata.assignedTo} onChange={handleChange}>
        {agents.map((agent) => (
            <option key={String(agent._id)} value={String(agent._id)}> {agent.name} </option>
        ))}
      </select>
      <label>Description :</label>
      <input
        type="text"
        name="desc"
        value={formdata.desc}
        onChange={handleChange}
      ></input>
      <label>Type :</label>
      <input
        type="text"
        name="type"
        value={formdata.type}
        onChange={handleChange}
      ></input>

      <button type = "submit">
        Submit
      </button>
    </form>
  );
};

export default SupportTicket;
