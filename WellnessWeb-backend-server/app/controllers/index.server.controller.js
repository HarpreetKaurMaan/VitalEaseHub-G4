const tf = require('@tensorflow/tfjs');

// Load symptom training and testing data
const symptom = require('../../symptom.json');
const symptomTesting = require('../../symptom-testing.json');

// Function to train and predict based on symptom data
exports.trainAndPredict = function (req, res) {
    const {
        body_temperature,
        heart_rate,
        respiratory_rate,
        pulse_rate
    } = req.body;

    // Prepare input data as tensor for the model
    const inputData = tf.tensor2d([[body_temperature, heart_rate, respiratory_rate, pulse_rate]]);

    // Prepare training data as tensor for the model
    const trainingData = tf.tensor2d(symptom.map(item => [
        item.body_temperature, item.heart_rate, item.respiratory_rate, item.pulse_rate
    ]));
    // Prepare output data as tensor for the model
    const outputData = tf.tensor2d(symptom.map(item => [
        item.to_doctor === "yes" ? 1 : 0,
    ]));

    const testingData = tf.tensor2d(symptomTesting.map(item => [
        item.body_temperature, item.heart_rate, item.respiratory_rate, item.pulse_rate
    ]));

    // Create a sequential model
    const model = tf.sequential();

    // Add layers to the model
    model.add(tf.layers.dense({
        inputShape: [4],
        activation: "sigmoid",
        units: 5,
    }));

    model.add(tf.layers.dense({
        inputShape: [5],
        activation: "sigmoid",
        units: 4,
    }));

    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 1,
    }));

    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(0.001),
        metrics: ['accuracy'],
    });

    console.log(model.summary());

    async function run() {
        const startTime = Date.now();
        let lossValue = NaN;

        for (let epoch = 0; epoch < 500 && isNaN(lossValue); epoch++) {
            const history = await model.fit(trainingData, outputData, {
                epochs: 1,
                callbacks: {
                    // Callback function executed at the end of each epoch
                    onEpochEnd: async (epoch, log) => {
                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                        console.log(body_temperature, heart_rate, respiratory_rate, pulse_rate);
                        if (isNaN(log.loss)) {
                            console.log('Stopping training due to NaN loss');
                            model.stopTraining = true;
                        }
                    }
                    
                }
            });

            if (isNaN(lossValue)) {
                console.log(`Skipping epoch ${epoch} due to NaN loss value.`);
            }
        }

        // Predict the results based on testing data
        const results = model.predict(testingData);

        results.array().then(array => {
            console.log(array[0][0])
            var resultForData1 = array[0][0] >= 0.5 ? "yes" : "no";
            var dataToSent = { row1: resultForData1 }
            console.log(resultForData1)
            console.log(dataToSent)
            console.log(body_temperature, heart_rate, respiratory_rate, pulse_rate)
            res.status(200).send(dataToSent);
        })
    }
    //Execute the training and prediction
    run();
};
