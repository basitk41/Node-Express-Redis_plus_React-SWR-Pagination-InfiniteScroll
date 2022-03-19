const putData = (phone_number) => {
  fetch("http://localhost:9000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Basit", phone_number }),
  });
};
for (let i = 200; i < 500; i++) {
  putData(`${i}`);
}
