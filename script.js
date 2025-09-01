let botao = document.querySelector(".botao-menu") 
let menu = document.querySelector(".menu")

botao.addEventListener('click', () => {
    menu.classList.toggle('ativo')

})

//Conexão api cliente - ver info do cliente
    const BASE_URL = "https://api.painelcliente.com";
    const TOKEN = "PANELCLIENT_HA8W8-WHVD7-SBDYJ-58HBW";
    const SECRET = "cd60cdf1b85a1e0a6409e09ddaaf6b0f";

    async function getClientInfo() {
      const username = document.getElementById("username").value;
      const output = document.getElementById("output");

      if (!username) {
        output.innerHTML = "⚠️ Digite o nome de usuário!";
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/get_client/${TOKEN}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            secret: SECRET,
            username: username
          })
        });

        const data = await response.json();

        if (data.result) {
          output.innerHTML = `
            ✅ Login bem-sucedido!<br>
            <strong>ID:</strong> ${data.data.id}<br>
            <strong>Usuário:</strong> ${data.data.username}<br>
            <strong>Expira em:</strong> ${new Date(data.data.exp_date * 1000).toLocaleString()}<br>
            <strong>Conexões Máx:</strong> ${data.data.max_connections}<br>
            <strong>Status:</strong> ${data.data.enabled ? "Ativo" : "Desativado"}
          `;
        } else {
          output.innerHTML = `❌ Erro: ${data.mens}`;
        }
      } catch (error) {
        output.innerHTML = "❌ Erro de conexão com a API!";
        console.error(error);
      }
    }
