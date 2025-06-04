# DiegoDPLShop

Una tienda online de bundles de sonido (kits de producción) creada con Vite + React + TailwindCSS y Stripe, desplegada en Vercel. En este repositorio encontrarás la base de código, instrucciones de configuración y estructura de carpetas para instalar, ejecutar y extender la aplicación.

---

## 📋 Descripción

**DiegoDPLShop** es el proyecto de tienda digital de DiegoDPL (productor musical / artista). En esta web podrás:

- Conocer al artista (“Sobre mí”).
- Explorar y escuchar previews de los bundles de sonido.
- Añadir bundles al carrito y pagar mediante Stripe.
- Descargar automáticamente los contenidos digitales después de la compra.
- Suscribirte a un newsletter y seguir las redes sociales del proyecto.

El front-end está construido con **Vite** y **React**, estilizado con **TailwindCSS**. Para los pagos se utiliza **Stripe Checkout** a través de una función serverless (Vercel Functions). Actualmente, el despliegue se realiza en **Vercel** (branch `main` → producción).

---

## 🚀 Tecnologías principales

- **Vite (React)**: Bundler ultrarrápido para desarrollo y build.
- **React 18**: Biblioteca para interfaces de usuario.
- **TailwindCSS**: Framework de estilos utilitarios.
- **React Router v6**: Enrutado en cliente para páginas (Home, Bundles, Carrito, Checkout, etc.).
- **Stripe Checkout**: Pasarela de pago para compras de los bundles.
- **Context API (React)**: Gestión global del estado del carrito de compras.
- **Vercel Functions**: Endpoint Serverless en `src/api/checkout-session.js` para crear sesiones de Stripe.
- **Vercel**: Plataforma de hosting (front + backend serverless).

---

## 📂 Estructura de carpetas

```
📦 DiegoDPLShop
├─ .gitignore
├─ package.json
├─ vite.config.js
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ public/
│   ├─ favicon.ico
│   └─ assets/               # Imágenes estáticas (logos, fotos del artista, portadas de bundles, previews)
│       ├─ bundle-1.jpg
│       ├─ bundle-2.jpg
│       └─ …
├─ src/
│   ├─ index.css             # Importación de Tailwind (“@tailwind base; @tailwind components; @tailwind utilities;”)
│   ├─ main.jsx              # Punto de entrada: ReactDOM.render + <CartProvider> + <App />
│   ├─ App.jsx               # Configuración de React Router + <Layout> (Navbar + Footer)
│   ├─ vite-env.d.ts         # Tipos de Vite (si usas TypeScript)
│   ├─ api/
│   │   └─ checkout-session.js  # Función serverless en Vercel para crear Stripe Checkout Sessions
│   ├─ components/           # Componentes reutilizables (UI)
│   │   ├─ Layout.jsx        # Contenedor general (Navbar + Footer + <main>)
│   │   ├─ Navbar.jsx        # Barra superior: logo, enlaces, icono carrito
│   │   ├─ Footer.jsx        # Pie de página: enlaces rápidos, redes, suscripción
│   │   ├─ BundleCard.jsx    # Tarjeta de producto (imagen, nombre, precio, botón “Ver más”)
│   │   ├─ CartItem.jsx      # Item individual dentro del carrito
│   │   └─ …
│   ├─ context/
│   │   └─ CartContext.jsx   # React Context para estado global del carrito (add, remove, clear, totalPrice)
│   ├─ pages/                # Páginas de React Router (vistas)
│   │   ├─ Home.jsx          # Página de aterrizaje (“Bienvenido a DiegoDPLShop”)
│   │   ├─ Bundles.jsx       # Listado de todos los bundles
│   │   ├─ BundleDetail.jsx  # Detalle individual de un bundle (params: id)
│   │   ├─ Cart.jsx          # Vista del carrito de compra
│   │   ├─ Checkout.jsx      # Página de confirmación de compra (llama a la API /api/checkout-session)
│   │   ├─ Success.jsx       # Página a la que Stripe redirige tras pago exitoso
│   │   └─ NotFound.jsx      # Página 404 (opcional)
│   ├─ utils/
│   │   └─ stripe.js         # Cliente de Stripe en front (loadStripe con VITE_STRIPE_PUBLISHABLE_KEY)
│   └─ data/                 # (Opcional) Datos estáticos de ejemplo (JSON con info de bundles)
│       └─ bundles.json
└─ README.md                 # ← (Este archivo)
```

---

## ⚙️ Configuración e instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Diego-DPL/DiegoDPLShop.git
cd DiegoDPLShop
```

### 2. Instalar dependencias

Asegúrate de tener instalado **Node.js v16+** (recomendado) y npm (o Yarn).

```bash
npm install
# ó, si usas Yarn:
# yarn
```

### 3. Variables de entorno

Crea un fichero llamado `.env` en la raíz (no subirlo a GitHub). Incluye tus claves de Stripe (test o live):

```ini

```

- **VITE_STRIPE_PUBLISHABLE_KEY**: clave pública de Stripe (prefijo `VITE_` para exponerla en el cliente).
- **STRIPE_SECRET_KEY**: clave secreta de Stripe, usada solo en el backend (Vercel Functions).
  ⚠️ Nunca expongas tu clave secreta en el front-end.

### 4. Scripts disponibles

```bash
# Modo desarrollo (hot-reload en http://localhost:5173/)
npm run dev

# Construcción para producción (genera /dist)
npm run build

# Vista previa de la build local
npm run preview
```

- `npm run dev`: arranca Vite en modo “watch” y recarga al guardar cambios.
- `npm run build`: transpila y empaqueta todo en `/dist`. Ideal para Vercel.
- `npm run preview`: sirve localmente el contenido de `/dist` para pruebas.

---

## 💻 Uso local

1. **Arranca el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

2. Abre tu navegador en `http://localhost:5173/`. Deberías ver:

   - El **Header** con logo “DiegoDPL” y menú: Inicio, Sobre mí, Bundles, Carrito.
   - La **Home** con presentación del proyecto y CTA “Ver Bundles”.
   - La página de **Bundles** (con datos de ejemplo o fijos).
   - La página de **BundleDetail** (detalle de cada bundle, “Añadir al carrito”).
   - El **Carrito** (Cart.jsx) que muestra items añadidos y total.
   - El **Checkout** (Checkout.jsx) que, al hacer clic en “Pagar con Stripe”, crea una Checkout Session y redirige a Stripe.
   - La página **Success** una vez completado el pago.

3. Si quieres probar el **flow de Stripe** (modo test), añade un artículo al carrito, ve a “Checkout” y utiliza uno de los números de tarjeta de prueba de Stripe (por ejemplo, `4242 4242 4242 4242`, MM/AA válido, CVC `123`).

---

## 🔧 Configuración de Stripe (Vercel)

Cuando despliegues en Vercel (branch `main` → producción), define las variables de entorno en la sección **Settings → Environment Variables**:

- **VITE_STRIPE_PUBLISHABLE_KEY** = tu clave pública (por ejemplo `pk_live_…` o `pk_test_…`).
- **STRIPE_SECRET_KEY** = tu clave secreta (por ejemplo `sk_live_…` o `sk_test_…`).

Vercel detecta automáticamente los archivos en `src/api/*.js` y los expone bajo `/api/[nombre]`. Por ejemplo:

- `src/api/checkout-session.js` → `https://<TU_DOMINIO>.vercel.app/api/checkout-session`

Nuestro front (Checkout.jsx) hace `fetch("/api/checkout-session", ...)`, que Vercel ejecuta la función y devuelve `session.id`. Asegúrate de usar las variables de entorno con el mismo nombre exacto (`process.env.STRIPE_SECRET_KEY` en serverless, `import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY` en front).

---

## 📄 Estructura y componentes clave

A modo de resumen, estos son los elementos más importantes del código:

- **`src/main.jsx`**  
  ```jsx
  import React from "react";
  import ReactDOM from "react-dom/client";
  import "./index.css";          # Tailwind
  import App from "./App";
  import { CartProvider } from "./context/CartContext";

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </React.StrictMode>
  );
  ```

- **`src/App.jsx`**  
  Define rutas con React Router y el `Layout` global.
  ```jsx
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Layout from "./components/Layout";
  import Home from "./pages/Home";
  import Bundles from "./pages/Bundles";
  import BundleDetail from "./pages/BundleDetail";
  import Cart from "./pages/Cart";
  import Checkout from "./pages/Checkout";
  import Success from "./pages/Success";
  import NotFound from "./pages/NotFound";

  function App() {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/bundles/:id" element={<BundleDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }

  export default App;
  ```

- **`src/context/CartContext.jsx`**  
  Contexto para almacenar `cartItems`, funciones: `addToCart`, `removeFromCart`, `clearCart`, `totalPrice`.

- **`src/api/checkout-session.js`**  
  Función serverless de Vercel para crear la sesión de Stripe:  
  ```js
  import Stripe from "stripe";

  // Clave secreta en producción (Vercel env)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const { items } = req.body;

        const line_items = items.map(item => ({
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              images: [item.imageUrl],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/cart`,
        });

        return res.status(200).json({ id: session.id });
      } catch (error) {
        console.error("Stripe checkout error:", error);
        return res.status(500).json({ error: "Error al crear la sesión de Stripe" });
      }
    } else {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Método no permitido" });
    }
  }
  ```

- **`src/utils/stripe.js`**  
  Inicializa Stripe en el cliente:  
  ```js
  import { loadStripe } from "@stripe/stripe-js";
  let stripePromise = null;

  export function getStripe() {
    if (!stripePromise) {
      stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
  }
  ```

- **`src/pages/Checkout.jsx`**  
  Envía el carrito al endpoint y redirige a Stripe:  
  ```jsx
  import { useCart } from "../context/CartContext";
  import { getStripe } from "../utils/stripe";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  export default function Checkout() {
    const { cartItems, clearCart, totalPrice } = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (cartItems.length === 0) {
        navigate("/bundles");
      }
    }, [cartItems, navigate]);

    const handleCheckout = async () => {
      setLoading(true);
      try {
        const itemsForApi = cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        }));

        const response = await fetch("/api/checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: itemsForApi }),
        });

        const { id: sessionId } = await response.json();
        const stripe = await getStripe();
        await stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        console.error("Error al crear la sesión de checkout:", error);
        setLoading(false);
      }
    };

    return (
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Confirmar Compra</h2>
        <p className="mb-4">Total a pagar: <span className="font-semibold">{totalPrice.toFixed(2)} €</span></p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full text-center ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-3 rounded`}
        >
          {loading ? "Procesando..." : "Pagar con Stripe"}
        </button>
      </div>
    );
  }
  ```

- **`src/pages/Success.jsx`**  
  Página final que vacía el carrito y muestra mensaje de éxito.

---

## 🔍 Modo Producción

1. **Build**  
   ```bash
   npm run build
   ```  
   Crea la carpeta `dist/` con todos los archivos optimizados.

2. **Deploy en Vercel**  
   - Ve a [vercel.com](https://vercel.com/) y conecta tu repositorio GitHub.  
   - Vercel detectará automáticamente que es un proyecto Vite (build command: `npm run build`; output: `dist`).  
   - Agrega las mismas variables de entorno en **Settings > Environment Variables**:  
     - `VITE_STRIPE_PUBLISHABLE_KEY`  
     - `STRIPE_SECRET_KEY`  
   - Despliega con **Deploy**.  
   - Tras unos segundos, tendrás la URL de producción:  
     ```
     https://diegodplshop.vercel.app
     ```

---

## 📐 Estructura de carpetas (resumen)

```plaintext
DiegoDPLShop/
├─ .gitignore
├─ .env.example            # Ejemplo de variables de entorno (sin claves reales)
├─ package.json
├─ vite.config.js
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ public/
│   ├─ favicon.ico
│   └─ assets/
│       ├─ bundle-1.jpg
│       ├─ bundle-2.jpg
│       └─ …
├─ src/
│   ├─ index.css
│   ├─ main.jsx
│   ├─ App.jsx
│   ├─ vite-env.d.ts
│   ├─ api/
│   │   └─ checkout-session.js
│   ├─ components/
│   │   ├─ Layout.jsx
│   │   ├─ Navbar.jsx
│   │   ├─ Footer.jsx
│   │   ├─ BundleCard.jsx
│   │   ├─ CartItem.jsx
│   │   └─ …
│   ├─ context/
│   │   └─ CartContext.jsx
│   ├─ pages/
│   │   ├─ Home.jsx
│   │   ├─ Bundles.jsx
│   │   ├─ BundleDetail.jsx
│   │   ├─ Cart.jsx
│   │   ├─ Checkout.jsx
│   │   ├─ Success.jsx
│   │   └─ NotFound.jsx
│   ├─ utils/
│   │   └─ stripe.js
│   └─ data/                # (Opcional) JSON de ejemplo: bundles.json
│       └─ bundles.json
└─ README.md                # ← (Este archivo)
```

---

## 🛠 Detalles y buenas prácticas

- **Variables de entorno**:  
  - Usa un fichero `.env` local en desarrollo.  
  - Nunca subas tu clave secreta (`STRIPE_SECRET_KEY`) al repositorio.  
  - En Vercel, configura las variables en **Settings → Environment Variables**.  

- **Imágenes / Bundles**:  
  - Guarda las portadas de los bundles y previews en `public/assets/`.  
  - Si crece el catálogo, considera usar un bucket (S3 / Cloud Storage) y un CMS para gestionar productos.  

- **Gestión de estado**:  
  - El carrito se maneja con React Context (`CartContext.jsx`).  
  - Para casos más complejos, podrías migrar a Redux, Zustand o Recoil, pero por ahora Context es suficiente.  

- **Stripe Checkout**:  
  - Se utiliza “serverless functions” (`src/api/checkout-session.js`) para no exponer lógica ni claves en el cliente.  
  - El front llama a `fetch("/api/checkout-session")`, Vercel ejecuta la función y devuelve `session.id`.  
  - Luego `stripe.redirectToCheckout({ sessionId })` redirige al checkout de Stripe.  

- **Patrones de diseño**:  
  - **Atomic Components**: cada componente en `src/components/` es “composable” y estilizado con Tailwind.  
  - **Pages vs. Components**: separa las vistas completas (pages) de los componentes reutilizables.  

- **Accesibilidad (A11y)**:  
  - Agrega `alt` descriptivos en todas las imágenes.  
  - Usa roles ARIA en elementos interactivos (menú, botones, etc.).  
  - Asegura contraste suficiente en texto sobre fondos oscuros.  

- **SEO Básico**:  
  - Asegura que cada página tenga `<meta>` y `<title>` descriptivos (puedes usar React Helmet u otro paquete en el futuro).  
  - Estructura semántica: usa etiquetas `<header>`, `<main>`, `<section>`, `<footer>` en el layout.  

---

## 🤝 Contribuir

Si quieres colaborar con mejoras, sigue estos pasos:

1. Haz fork de este repositorio.  
2. Crea una rama feature / fix:  
   ```bash
   git checkout -b feat/nueva-funcionalidad
   ```  
3. Realiza tus cambios, crea commits claros y descriptivos.  
4. Haz push a tu fork y abre un Pull Request describiendo la funcionalidad o corrección.  
5. Espera revisión y aprobación.  

---

## 📝 Licencia

Este proyecto está bajo la licencia **MIT License**. Consulta [LICENSE](./LICENSE) para más detalles.

---

## 👤 Autor

**DiegoDPL** – Productor y desarrollador –  
- GitHub: [@Diego-DPL](https://github.com/Diego-DPL)  
- Instagram: [@DiegoDPL](https://instagram.com/DiegoDPL)  
- Correo: diego@example.com  (reemplaza por el tuyo real)

---

> ❤️ ¡Gracias por visitar DiegoDPLShop! Si te ha gustado, comparte el proyecto y suscríbete para estar al día de nuevos bundles.