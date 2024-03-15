export const getStandings = async () => {
  const response = await fetch("http://localhost:5000/api/standings", {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getTeams = async () => {
  const response = await fetch("http://localhost:5000/api/teams", {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
