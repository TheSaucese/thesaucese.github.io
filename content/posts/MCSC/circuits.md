---
weight: 1
title: "MCSC 2024 - Q4N1"
date: 2024-13-15T16:37:00+06:00
lastmod: 2024-13-15T16:37:00+06:00
draft: false
author: "theSaucese"
authorLink: "https://thesaucese.github.io"
description: "Writeup for Q4N1 challenge."

tags: ["Misc", "MCSC", "Q4N1"]
categories: ["Writeups"]

lightgallery: true

math:
  enable: true

toc:
  enable: true
---

Writeup for Quantum challenge from MCSC 2024.

<!--more-->

```python
from qiskit import QuantumCircuit, execute, Aer

# Create a quantum circuit with 7 qubits and 7 classical bits
circuit = QuantumCircuit(7, 7)

# Apply the gates from your OPENQASM code
circuit.cz(2, 4)
circuit.z(2)
circuit.cy(2, 4)
# ... (add the remaining gates)

# Measure all qubits
circuit.measure(range(7), range(7))

# Choose a backend (simulator or real quantum computer)
simulator = Aer.get_backend('qasm_simulator')

# Execute the circuit and get the counts
job = execute(circuit, backend=simulator, shots=1024)  # Increase shots for better statistics
counts = job.result().get_counts()

# Print the measurement results
print(counts)

```

## Explanation

You create a quantum circuit with 7 qubits and 7 classical bits, where quantum operations are performed on the qubits, and the classical bits store the measurement results. Several quantum gates are applied, including a controlled-Z gate (cz) where qubit 2 controls qubit 4, a Z gate that flips the phase of qubit 2, and a controlled-Y gate (cy) with qubit 2 as the control and qubit 4 as the target. After adding the necessary gates, all 7 qubits are measured, with the results stored in the corresponding classical bits. The circuit is then simulated using the `qasm_simulator` backend, which mimics a real quantum computer. The circuit is executed 1024 times to gather statistical outcomes, and the measurement results are retrieved and displayed as a dictionary, showing the frequency of each possible outcome in binary form.