import React, { useState } from 'react';
import { ArrowRight, Brain, Zap, Target } from 'lucide-react';

const LLMVisualExplanation = () => {
  const [activeTab, setActiveTab] = useState('vectors');
  const [selectedWords, setSelectedWords] = useState(['rei', 'rainha']);

  // Dados dos vetores (simplificado para 2D)
  const wordVectors = {
    'rei': { x: 0.8, y: 0.6, color: '#3b82f6' },
    'rainha': { x: 0.75, y: 0.65, color: '#ec4899' },
    'homem': { x: 0.7, y: 0.3, color: '#8b5cf6' },
    'mulher': { x: 0.65, y: 0.35, color: '#f59e0b' },
    'carro': { x: -0.5, y: 0.8, color: '#10b981' },
    'banana': { x: 0.2, y: -0.7, color: '#ef4444' }
  };

  // Calcular cosseno entre dois vetores
  const calculateCosine = (v1, v2) => {
    const dotProduct = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
    const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
    return dotProduct / (mag1 * mag2);
  };

  const calculateDotProduct = (v1, v2) => {
    return v1.x * v2.x + v1.y * v2.y;
  };

  // Componente de vetor 2D
  const VectorVisualization = () => {
    const scale = 120;
    const centerX = 150;
    const centerY = 150;

    const v1 = wordVectors[selectedWords[0]];
    const v2 = wordVectors[selectedWords[1]];
    
    const cosine = calculateCosine(v1, v2);
    const dotProduct = calculateDotProduct(v1, v2);
    const angle = Math.acos(cosine) * (180 / Math.PI);

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
          <svg width="300" height="300" className="mx-auto">
            {/* Grid */}
            <line x1="0" y1={centerY} x2="300" y2={centerY} stroke="#e5e7eb" strokeWidth="1"/>
            <line x1={centerX} y1="0" x2={centerX} y2="300" stroke="#e5e7eb" strokeWidth="1"/>
            
            {/* Círculo de referência */}
            <circle cx={centerX} cy={centerY} r={scale} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4"/>
            
            {/* Vetor 1 */}
            <defs>
              <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill={v1.color} />
              </marker>
            </defs>
            <line 
              x1={centerX} 
              y1={centerY} 
              x2={centerX + v1.x * scale} 
              y2={centerY - v1.y * scale}
              stroke={v1.color}
              strokeWidth="3"
              markerEnd="url(#arrow1)"
            />
            <text x={centerX + v1.x * scale + 10} y={centerY - v1.y * scale} fill={v1.color} fontWeight="bold">
              {selectedWords[0]}
            </text>

            {/* Vetor 2 */}
            <defs>
              <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill={v2.color} />
              </marker>
            </defs>
            <line 
              x1={centerX} 
              y1={centerY} 
              x2={centerX + v2.x * scale} 
              y2={centerY - v2.y * scale}
              stroke={v2.color}
              strokeWidth="3"
              markerEnd="url(#arrow2)"
            />
            <text x={centerX + v2.x * scale + 10} y={centerY - v2.y * scale - 10} fill={v2.color} fontWeight="bold">
              {selectedWords[1]}
            </text>

            {/* Arco do ângulo */}
            <path
              d={`M ${centerX + 30} ${centerY} A 30 30 0 0 0 ${centerX + 30 * Math.cos(-angle * Math.PI / 180)} ${centerY + 30 * Math.sin(-angle * Math.PI / 180)}`}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
            />
            <text x={centerX + 40} y={centerY - 15} fill="#6366f1" fontSize="12">
              {angle.toFixed(1)}°
            </text>
          </svg>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Produto Escalar (Dot Product)</div>
              <div className="text-2xl font-bold text-blue-600">{dotProduct.toFixed(3)}</div>
              <div className="text-xs text-gray-500 mt-1">A·B = {v1.x.toFixed(2)}×{v2.x.toFixed(2)} + {v1.y.toFixed(2)}×{v2.y.toFixed(2)}</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Similaridade do Cosseno</div>
              <div className="text-2xl font-bold text-purple-600">{cosine.toFixed(3)}</div>
              <div className="text-xs text-gray-500 mt-1">cos(θ) = A·B / (||A|| ||B||)</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg">
            <div className="text-sm font-semibold mb-2">💡 Interpretação:</div>
            <div className="text-sm">
              {cosine > 0.9 ? '🟢 Muito similar! Palavras com significados muito próximos.' :
               cosine > 0.5 ? '🟡 Moderadamente similar. Têm alguma relação semântica.' :
               cosine > 0 ? '🟠 Pouco similar. Significados distantes.' :
               '🔴 Sem relação ou opostos.'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-2">Palavra 1:</label>
            <select 
              value={selectedWords[0]}
              onChange={(e) => setSelectedWords([e.target.value, selectedWords[1]])}
              className="w-full p-2 border rounded-lg"
            >
              {Object.keys(wordVectors).map(word => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Palavra 2:</label>
            <select 
              value={selectedWords[1]}
              onChange={(e) => setSelectedWords([selectedWords[0], e.target.value])}
              className="w-full p-2 border rounded-lg"
            >
              {Object.keys(wordVectors).map(word => (
                <option key={word} value={word}>{word}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };

  // Componente de Atenção
  const AttentionVisualization = () => {
    const sentence = ['O', 'rei', 'governa', 'o', 'reino'];
    const attentionScores = [
      [0.1, 0.3, 0.2, 0.1, 0.3], // O
      [0.1, 0.4, 0.2, 0.05, 0.25], // rei
      [0.15, 0.3, 0.3, 0.1, 0.15], // governa
      [0.2, 0.2, 0.15, 0.25, 0.2], // o
      [0.1, 0.35, 0.15, 0.1, 0.3]  // reino
    ];

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600"/>
            Mapa de Atenção: "O rei governa o reino"
          </h3>
          
          <div className="mb-4 text-sm text-gray-600">
            💡 Cada linha mostra quanto cada palavra "presta atenção" nas outras
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left">Token</th>
                  {sentence.map((word, i) => (
                    <th key={i} className="p-2 text-center text-sm">{word}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sentence.map((word, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 font-semibold text-sm">{word}</td>
                    {attentionScores[i].map((score, j) => (
                      <td key={j} className="p-2">
                        <div 
                          className="h-12 rounded flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: `rgba(139, 92, 246, ${score})`,
                            color: score > 0.3 ? 'white' : 'black'
                          }}
                        >
                          {score.toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <div className="font-semibold mb-2">🔍 Observação:</div>
            <ul className="text-sm space-y-1">
              <li>• "rei" presta muita atenção em si mesmo (0.40) e em "reino" (0.25)</li>
              <li>• "governa" se conecta com "rei" (0.30) - são semanticamente relevantes</li>
              <li>• Cores mais escuras = maior peso de atenção</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Componente Softmax
  const SoftmaxVisualization = () => {
    const tokens = ['cachorro', 'carro', 'banana', 'casa', 'rei'];
    const rawScores = [2.1, 0.3, -1.4, 0.8, -0.5];
    
    const expScores = rawScores.map(s => Math.exp(s));
    const sumExp = expScores.reduce((a, b) => a + b, 0);
    const probabilities = expScores.map(e => e / sumExp);

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600"/>
            Softmax: De Pontuações para Probabilidades
          </h3>

          <div className="space-y-4">
            {tokens.map((token, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{token}</span>
                  <div className="flex gap-4">
                    <span className="text-gray-600">
                      Score: <span className="font-mono">{rawScores[i].toFixed(2)}</span>
                    </span>
                    <span className="text-green-600 font-bold">
                      Prob: {(probabilities[i] * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold transition-all duration-500"
                    style={{ width: `${probabilities[i] * 100}%` }}
                  >
                    {probabilities[i] * 100 > 5 ? `${(probabilities[i] * 100).toFixed(1)}%` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="font-semibold mb-2">📊 Como funciona:</div>
            <div className="text-sm space-y-2">
              <div className="font-mono text-xs bg-white p-2 rounded">
                Softmax(z<sub>i</sub>) = e<sup>z<sub>i</sub></sup> / Σe<sup>z<sub>j</sub></sup>
              </div>
              <ul className="space-y-1">
                <li>• Scores negativos viram probabilidades muito baixas</li>
                <li>• Scores positivos dominam a distribuição</li>
                <li>• Todas as probabilidades somam 100%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Pipeline completo
  const PipelineVisualization = () => {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-purple-200">
          <h3 className="text-xl font-bold mb-6 text-center">🚀 Pipeline Completo de uma LLM</h3>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div className="font-bold">Tokenização</div>
              </div>
              <div className="ml-11 text-sm">
                <div className="mb-2">"O rei governa"</div>
                <div className="flex gap-2">
                  <span className="bg-blue-100 px-3 py-1 rounded">O</span>
                  <span className="bg-blue-100 px-3 py-1 rounded">rei</span>
                  <span className="bg-blue-100 px-3 py-1 rounded">governa</span>
                </div>
              </div>
            </div>

            <ArrowRight className="mx-auto text-gray-400"/>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div className="font-bold">Embeddings</div>
              </div>
              <div className="ml-11 text-sm">
                <div className="space-y-1 font-mono text-xs">
                  <div>"O" → [0.12, -0.45, 0.78, ...]</div>
                  <div>"rei" → [0.82, 0.11, 0.33, ...]</div>
                  <div>"governa" → [-0.23, 0.91, 0.15, ...]</div>
                </div>
              </div>
            </div>

            <ArrowRight className="mx-auto text-gray-400"/>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div className="font-bold">Self-Attention</div>
              </div>
              <div className="ml-11 text-sm">
                <div className="mb-2">Calcula Q, K, V para cada token</div>
                <div className="text-xs text-gray-600">Q·K<sup>T</sup> → scores de atenção</div>
              </div>
            </div>

            <ArrowRight className="mx-auto text-gray-400"/>

            {/* Step 4 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div className="font-bold">Softmax nos pesos</div>
              </div>
              <div className="ml-11 text-sm">
                <div className="text-xs text-gray-600">Normaliza pesos de atenção → [0, 1]</div>
              </div>
            </div>

            <ArrowRight className="mx-auto text-gray-400"/>

            {/* Step 5 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div className="font-bold">Predição</div>
              </div>
              <div className="ml-11 text-sm">
                <div>Próxima palavra mais provável: <span className="font-bold text-orange-600">"o"</span> (87%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Zap className="w-8 h-8"/>
          Como LLMs Funcionam: Visualização Interativa
        </h1>
        <p className="text-blue-100">Explore os conceitos matemáticos por trás das Large Language Models</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('vectors')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'vectors' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📐 Vetores & Cossenos
          </button>
          <button
            onClick={() => setActiveTab('attention')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'attention' 
                ? 'border-b-2 border-purple-600 text-purple-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🧠 Atenção
          </button>
          <button
            onClick={() => setActiveTab('softmax')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'softmax' 
                ? 'border-b-2 border-green-600 text-green-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🎯 Softmax
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'pipeline' 
                ? 'border-b-2 border-orange-600 text-orange-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🚀 Pipeline
          </button>
        </div>
      </div>

      <div>
        {activeTab === 'vectors' && <VectorVisualization />}
        {activeTab === 'attention' && <AttentionVisualization />}
        {activeTab === 'softmax' && <SoftmaxVisualization />}
        {activeTab === 'pipeline' && <PipelineVisualization />}
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
        <div className="font-semibold mb-2">💡 Dicas de uso:</div>
        <ul className="space-y-1">
          <li>• Na aba "Vetores & Cossenos", mude as palavras para ver como a similaridade muda</li>
          <li>• O ângulo entre vetores determina quão similares são os significados</li>
          <li>• Quanto mais próximo de 1.0 o cosseno, mais similar</li>
          <li>• O produto escalar não é normalizado, pode ser maior que 1</li>
        </ul>
      </div>
    </div>
  );
};

export default LLMVisualExplanation;