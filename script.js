
        const frases = [
            { frase: 'La educacion es el arma mas poderosa que \npuedes usar para cambiar el mundo.\n- Nelson Mandela' },
            { frase: 'La imaginacion es mas importante que el \nconocimiento.\n- Albert Einstein' },
            { frase: 'Innovar distingue a los lideres de los \nseguidores.\n- Steve Jobs' },
            { frase: 'Ser el cambio que quieres ver en el mundo.\n- Mahatma Gandhi' },
            { frase: 'La felicidad no es algo hecho. Viene de \ntus propias acciones.\n- Confucio' },
            { frase: 'El exito es una combinacion de suerte y \ntalento, y trabajo duro.\n- Oscar Wilde' },
            { frase: 'Lo que realmente importa en la vida es como \nayudamos a los demas.\n- Martin Luther King Jr.' },
            { frase: 'El exito no es permanente y el fracaso \nno es fatal.\n- Vince LOMBARDI' },
            { frase: 'Nuestras diferencias nos hacen hermosos.\n- William Shakespeare' },
            { frase: 'El fracaso es una oportunidad para comenzar \nde nuevo con mas inteligencia.\n- Frank Sinatra' },
            { frase: 'La vida es demasiado importante para ser \ntomada en serio.\n- Mark Twain' },
            { frase: 'La vida es lo que te pasa mientras estas \nocupado haciendo otros planes.\n- John Lennon - ' },
            { frase: 'Nunca dejes que nadie te haga sentir inferior.\n- Marilyn Monroe' },
            { frase: 'Si puedes soñarlo, puedes hacerlo.\n- Walt Disney' },
            { frase: 'La imaginacion es más importante que el \nconocimiento.\n- J.K. Rowling' },
            { frase: 'La felicidad es un acto de eleccion.\n- Aristoteles' },
            { frase: 'La compasion es la base de toda la \naccion positiva.\n- Dalai Lama - ' },
        ];

        function getRandomQuote() {
            const index = Math.floor(Math.random() * frases.length);
            console.log(frases[index]);
            return frases[index];
        }


        const frase = getRandomQuote();
        const scene = new THREE.Scene();
        const light = new THREE.DirectionalLight(0x000000, 1);
        light.position.set(0, 0, 0);
        light.castShadow = true;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.00001, 1000);
        camera.position.z = 100;
        camera.position.x = 140;
        camera.position.y = 0;

        // Create the renderer and set its size
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight / 1.1);
        renderer.autoClear = false;
        renderer.shadowMap.enabled = true;
        camera.castShadow = true;



        // Attach the renderer to the container element
        document.getElementById("container").appendChild(renderer.domElement);

        // Load the font JSON file
        var loader = new THREE.FontLoader();
        loader.load('helvetiker_regular.typeface.json', function (font) {
            // Use the font to create the text geometry and material
            var textGeometry = new THREE.TextGeometry(frase.frase, {
                font: font,
                size: 10,
                height: 0.5
            });
            var textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            textMaterial.receiveShadow = true;
            // Create the text mesh and add it to the scene
            var textMesh = new THREE.Mesh(textGeometry, textMaterial);
            scene.add(textMesh);
            scene.add(light);

            for (let i = 0; i < 10; i++) {
                const sphere = new THREE.SphereGeometry(3, 32, 32);
                const material = new THREE.MeshBasicMaterial({ color: 0xED7102 });
                const mesh = new THREE.Mesh(sphere, material);

                // Asignar diferentes posiciones y ángulos de rotación a cada esfera
                mesh.position.x = 0 * Math.sin(i * Math.PI / 5);
                mesh.position.y = 0 * Math.cos(i * Math.PI / 5);
                mesh.rotation.y = i * Math.PI / 5;

                scene.add(mesh);
            }

            for (let i = 0; i < 10; i++) {
                const sphere2 = new THREE.SphereGeometry(3, 32, 32);
                const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const mesh2 = new THREE.Mesh(sphere2, material2);

                // Asignar diferentes posiciones y ángulos de rotación a cada esfera
                mesh2.position.x = 20 * Math.sin(i * Math.PI / 5);
                mesh2.position.y = 20 * Math.cos(i * Math.PI / 5);
                mesh2.rotation.y = i * Math.PI / 5;

                scene.add(mesh2);
            }

            function animate() {
                requestAnimationFrame(animate);

                // Hacer que las esferas giren alrededor del texto
                scene.children.forEach(mesh => {
                    mesh.position.x = 20 * Math.sin(mesh.rotation.y);
                    mesh.position.y = 20 * Math.cos(mesh.rotation.y)+35;
                    mesh.rotation.y += 0.01;
                    textMesh.position.x = 0;
                    textMesh.position.y = 0;
                    textMesh.rotation.y = 0;
                });

                renderer.render(scene, camera);
            }

            animate();

            function animate2() {
                requestAnimationFrame(animate2);

                // Hacer que las esferas giren alrededor del texto
                scene.children.forEach(mesh2 => {
                    mesh2.position.x = 20 * Math.sin(mesh2.rotation.y)+270;
                    mesh2.position.y = 20 * Math.cos(mesh2.rotation.y)-35;
                    mesh2.rotation.y += 0.01;
                    textMesh.position.x = 0;
                    textMesh.position.y = 0;
                    textMesh.rotation.y = 0;
                });

                renderer.render(scene, camera);
            }

            animate2();

            var speech = new SpeechSynthesisUtterance();
            speech.text = frase.frase;
            speech.volume = 2;
            speech.rate = 0.9;
            speech.pitch = -2;
            window.speechSynthesis.speak(speech);
            // Render the scene
        });

  