# Deep Learning Fundamentals

## Chapter 1: Neural Networks

Neural networks are computing systems inspired by biological neural networks. They are composed of nodes (neurons) connected by edges (synapses).

### Key Components:

- **Input Layer**: Receives the input data
- **Hidden Layers**: Process the data through weighted connections
- **Output Layer**: Produces the final result
- **Activation Functions**: Determine the output of neurons

### Common Activation Functions:

1. **ReLU (Rectified Linear Unit)**: f(x) = max(0, x)
2. **Sigmoid**: f(x) = 1 / (1 + e^(-x))
3. **Tanh**: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))

## Chapter 2: Training Neural Networks

Training involves adjusting weights and biases to minimize the loss function.

### Backpropagation Algorithm:

1. Forward pass: Compute predictions
2. Calculate loss
3. Backward pass: Compute gradients
4. Update weights using gradient descent

### Optimization Techniques:

- **SGD (Stochastic Gradient Descent)**
- **Adam Optimizer**
- **RMSprop**

The learning rate is a crucial hyperparameter that determines how quickly the model learns.
