/**
 * STORAGE ENGINE — DADOS EXATOS DA PLANILHA VICTOR ORÇAMENTO ANUAL.XLSX
 * Integrado com vínculos entre Orçamento 2026 e CARTAO AGOSTO (Coluna 'O que?').
 */

const STORAGE_KEY = 'victor_finance_dashboard_v3_exact';

const DEFAULT_FINANCIAL_DATA = {
  "selectedYear": 2026,
  "selectedMonth": "Outubro",
  "faturaAtiva": "Outubro",
  "activeMonth": "Agosto",
  "years": {
    "2024": {
      "sheet": "Orçamento 2024",
      "months": [
        {
          "name": "Janeiro",
          "receita": 803.76,
          "fixa": 2777.51,
          "variavel": 2955.62,
          "invest": 70.63,
          "sobra": 70.0
        },
        {
          "name": "Fevereiro",
          "receita": 803.76,
          "fixa": 70.0,
          "variavel": 225.18,
          "invest": 70.43,
          "sobra": 70.0
        },
        {
          "name": "Março",
          "receita": 803.76,
          "fixa": 39.9,
          "variavel": 262.18,
          "invest": 70.47,
          "sobra": 70.0
        },
        {
          "name": "Abril",
          "receita": 803.76,
          "fixa": 39.9,
          "variavel": 300.89,
          "invest": 70.56,
          "sobra": 70.0
        },
        {
          "name": "Maio",
          "receita": 803.76,
          "fixa": 44.9,
          "variavel": 335.29,
          "invest": 70.58,
          "sobra": 70.0
        },
        {
          "name": "Junho",
          "receita": 803.76,
          "fixa": 44.9,
          "variavel": 209.49,
          "invest": 100.56,
          "sobra": 100.0
        },
        {
          "name": "Julho",
          "receita": 803.76,
          "fixa": 44.9,
          "variavel": 167.25,
          "invest": 100.56,
          "sobra": 100.0
        },
        {
          "name": "Agosto",
          "receita": 803.76,
          "fixa": 44.9,
          "variavel": 87.35,
          "invest": 0.67,
          "sobra": 0.0
        },
        {
          "name": "Setembro",
          "receita": 803.76,
          "fixa": 44.9,
          "variavel": 87.35,
          "invest": 100.64,
          "sobra": 100.0
        },
        {
          "name": "Outubro",
          "receita": 803.76,
          "fixa": 44.9,
          "variavel": 38.84,
          "invest": 100.45,
          "sobra": 100.0
        },
        {
          "name": "Novembro",
          "receita": 803.76,
          "fixa": 69.9,
          "variavel": 113.22,
          "invest": 0.45,
          "sobra": 0.0
        },
        {
          "name": "Dezembro",
          "receita": 803.76,
          "fixa": 44.9,
          "variavel": 361.43,
          "invest": 700.39,
          "sobra": 700.0
        }
      ],
      "receitas_itens": [
        {
          "row": 4,
          "label": "Salário Líquido",
          "valores": [
            3137.64,
            3134.64,
            3406.66,
            3306.28,
            3306.28,
            3306.28,
            3306.28,
            3306.28,
            3306.28,
            3306.28,
            3244.54,
            3306.28
          ]
        },
        {
          "row": 5,
          "label": "Insalubridade",
          "valores": [
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67
          ]
        },
        {
          "row": 6,
          "label": "Ajuda Custo Alim",
          "valores": [
            411.12,
            459.68,
            565.76,
            495.04,
            424.32,
            777.92,
            106.08,
            565.76,
            636.48,
            433.3,
            0.0,
            574.74
          ]
        },
        {
          "row": 7,
          "label": "DEJEM / Delegada",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            2228.02,
            2253.4,
            2471.04
          ]
        },
        {
          "row": 8,
          "label": "Férias",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1771.87,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 9,
          "label": "13º Salário",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            2152.48,
            0.0,
            2162.28
          ]
        },
        {
          "row": 10,
          "label": "Renda extra",
          "valores": [
            0.0,
            480.0,
            480.0,
            640.0,
            1320.0,
            1320.0,
            860.0,
            860.0,
            720.0,
            610.0,
            940.0,
            987.0
          ]
        },
        {
          "row": 11,
          "label": "Sobra Mensal",
          "valores": [
            3342.27,
            1011.73,
            4440.34,
            3446.47,
            2204.95,
            1483.05,
            1915.45,
            1314.44,
            85.47,
            160.81,
            311.15,
            134.62
          ]
        },
        {
          "row": 12,
          "label": "Outros",
          "valores": [
            512.5,
            6325.0,
            1500.0,
            1285.84,
            1095.03,
            1617.84,
            2858.25,
            1290.05,
            500.0,
            0.0,
            900.0,
            0.0
          ]
        },
        {
          "row": 13,
          "label": "Receita Total",
          "valores": [
            8189.2,
            12196.72,
            11178.43,
            9959.3,
            9136.25,
            9290.76,
            9831.73,
            8122.2,
            7805.77,
            9676.56,
            8434.76,
            10421.63
          ]
        },
        {
          "row": 14,
          "label": "ESSENCIAL",
          "valores": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        }
      ],
      "fixas_itens": [
        {
          "row": 17,
          "label": "Financiamento Carro",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            999.61,
            999.61,
            1025.99
          ]
        },
        {
          "row": 18,
          "label": "Entrada Carro",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            790.17,
            790.17,
            790.17
          ]
        },
        {
          "row": 19,
          "label": "Ajuda casa (mensal)",
          "valores": [
            150.0,
            162.43,
            220.0,
            200.0,
            200.0,
            200.0,
            200.0,
            200.0,
            200.0,
            200.0,
            153.0,
            153.0
          ]
        },
        {
          "row": 20,
          "label": "Mercado (limite)",
          "valores": [
            88.55,
            85.48,
            39.17,
            0.0,
            142.97,
            0.0,
            84.03,
            105.01,
            93.78,
            94.81,
            86.55,
            90.48
          ]
        },
        {
          "row": 21,
          "label": "Alimentação trabalho (limite)",
          "valores": [
            99.0,
            144.0,
            192.0,
            183.18,
            15.0,
            190.86,
            0.0,
            60.0,
            0.0,
            0.0,
            247.27,
            303.09
          ]
        },
        {
          "row": 22,
          "label": "Transporte",
          "valores": [
            150.0,
            150.0,
            100.0,
            0.0,
            100.0,
            50.0,
            0.0,
            30.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 23,
          "label": "Advogados (mensal)",
          "valores": [
            65.0,
            65.0,
            65.0,
            65.0,
            65.0,
            65.0,
            65.0,
            65.0,
            65.0,
            65.0,
            65.0,
            130.0
          ]
        },
        {
          "row": 24,
          "label": "Recarga Tim (mensal)",
          "valores": [
            60.0,
            60.0,
            60.0,
            0.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0
          ]
        },
        {
          "row": 25,
          "label": "Farmácia (limite)",
          "valores": [
            9.0,
            66.3,
            66.3,
            46.12,
            24.68,
            0.0,
            186.83,
            195.36,
            246.54,
            149.66,
            149.65,
            151.39
          ]
        },
        {
          "row": 26,
          "label": "Convênio",
          "valores": [
            144.28,
            33.9,
            33.9,
            33.9,
            33.9,
            33.9,
            33.9,
            107.94,
            88.9,
            33.9,
            33.9,
            33.9
          ]
        },
        {
          "row": 27,
          "label": "Tratamento Médico",
          "valores": [
            0.0,
            522.34,
            397.0,
            397.0,
            397.0,
            170.0,
            964.0,
            472.04,
            472.04,
            472.04,
            75.04,
            75.04
          ]
        },
        {
          "row": 28,
          "label": "Exames",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            62.1,
            62.1,
            62.1,
            62.1,
            62.1,
            62.1,
            62.1
          ]
        },
        {
          "row": 29,
          "label": "Combustível (limite)",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            400.0,
            200.0,
            200.0
          ]
        },
        {
          "row": 30,
          "label": "Estacionamento (limite)",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            90.48,
            66.0,
            99.36
          ]
        },
        {
          "row": 31,
          "label": "Outros",
          "valores": [
            95.93,
            0.0,
            90.0,
            0.0,
            0.0,
            0.0,
            0.0,
            403.25,
            0.0,
            0.0,
            0.0,
            78.1
          ]
        },
        {
          "row": 32,
          "label": "Essencial",
          "valores": [
            1915.52,
            2393.21,
            2397.13,
            2078.96,
            2242.31,
            2085.62,
            2959.62,
            2564.46,
            2542.12,
            4921.53,
            4492.05,
            4790.99
          ]
        },
        {
          "row": 33,
          "label": "Essencial/Receita",
          "valores": [
            0.23,
            0.2,
            0.21,
            0.21,
            0.25,
            0.22,
            0.3,
            0.32,
            0.33,
            0.51,
            0.53,
            0.46
          ]
        },
        {
          "row": 34,
          "label": "ESTILO DE VIDA",
          "valores": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        }
      ],
      "variaveis_itens": [
        {
          "row": 38,
          "label": "Acessórios",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            47.6,
            47.6,
            47.6,
            47.6,
            0.0
          ]
        },
        {
          "row": 39,
          "label": "Cuidados Pessoais (limite)",
          "valores": [
            68.83,
            321.12,
            159.89,
            156.39,
            229.39,
            81.69,
            178.55,
            121.25,
            97.55,
            175.84,
            169.31,
            138.62
          ]
        },
        {
          "row": 40,
          "label": "Vestuário - Pix (Tia Érica)",
          "valores": [
            163.84,
            163.84,
            254.26,
            315.15,
            315.15,
            315.15,
            315.15,
            315.15,
            315.15,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 41,
          "label": "Uber",
          "valores": [
            349.08,
            302.7,
            254.21,
            176.91,
            203.7,
            308.19,
            282.46,
            267.61,
            241.07,
            139.07,
            8.07,
            7.42
          ]
        },
        {
          "row": 42,
          "label": "Salão de beleza (limite)",
          "valores": [
            160.0,
            115.0,
            250.0,
            204.0,
            55.0,
            219.9,
            124.9,
            124.9,
            244.9,
            124.9,
            124.9,
            303.31
          ]
        },
        {
          "row": 43,
          "label": "Estudos",
          "valores": [
            572.93,
            571.21,
            571.21,
            356.67,
            356.67,
            487.82,
            647.19,
            692.78,
            613.79,
            360.08,
            457.22,
            457.22
          ]
        },
        {
          "row": 44,
          "label": "Faculdade (boleto)",
          "valores": [
            201.82,
            201.82,
            258.93,
            201.82,
            201.83,
            201.82,
            202.99,
            790.05,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 45,
          "label": "Eletrodomésticos/Móveis",
          "valores": [
            384.04,
            263.23,
            232.65,
            232.65,
            232.65,
            232.65,
            232.65,
            142.65,
            142.65,
            175.72,
            181.52,
            175.69
          ]
        },
        {
          "row": 46,
          "label": "Assinaturas/Anuidades",
          "valores": [
            197.64,
            411.72,
            409.61,
            388.41,
            131.6,
            140.26,
            152.72,
            93.85,
            83.95,
            193.75,
            91.85,
            100.34
          ]
        },
        {
          "row": 47,
          "label": "Lazer (limite)",
          "valores": [
            783.0,
            1302.81,
            1072.73,
            500.0,
            772.16,
            531.76,
            693.48,
            891.13,
            993.25,
            996.17,
            729.97,
            644.05
          ]
        },
        {
          "row": 48,
          "label": "Viagens",
          "valores": [
            0.0,
            61.0,
            61.0,
            98.1,
            98.1,
            98.1,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 49,
          "label": "Presentes (limite)",
          "valores": [
            74.44,
            144.53,
            155.46,
            220.49,
            321.17,
            607.32,
            548.01,
            292.31,
            473.81,
            322.37,
            252.91,
            217.03
          ]
        }
      ],
      "invest_itens": [
        {
          "row": 54,
          "label": "Est. de vida/Receita",
          "valores": [
            0.63,
            0.43,
            0.47,
            0.56,
            0.58,
            0.56,
            0.56,
            0.67,
            0.64,
            0.45,
            0.45,
            0.39
          ]
        },
        {
          "row": 55,
          "label": "INVESTIMENTOS",
          "valores": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        },
        {
          "row": 56,
          "label": "Reserva financeira",
          "valores": [
            70.0,
            70.0,
            70.0,
            70.0,
            70.0,
            100.0,
            100.0,
            0.0,
            100.0,
            100.0,
            0.0,
            700.0
          ]
        }
      ]
    },
    "2026": {
      "sheet": "Orçamento 2026",
      "atualizadoEm": "08/08/2026",
      "months": [
        {
          "name": "Julho",
          "receita": 9858.58,
          "fixa": 7574.75,
          "variavel": 1280.78,
          "invest": 1000.0,
          "sobra": 3.05,
          "status": "Realizado"
        },
        {
          "name": "Agosto",
          "receita": 9178.74,
          "fixa": 6177.86,
          "variavel": 1577.12,
          "invest": 1200.0,
          "sobra": 223.76,
          "status": "Mês Atual"
        },
        {
          "name": "Setembro",
          "receita": 8838.89,
          "fixa": 4820.43,
          "variavel": 1381.79,
          "invest": 1000.0,
          "sobra": 1636.67,
          "status": "Orçado / Meta"
        },
        {
          "name": "Outubro",
          "receita": 7973.89,
          "fixa": 3960.54,
          "variavel": 1381.79,
          "invest": 1000.0,
          "sobra": 1631.56,
          "status": "Orçado / Meta"
        },
        {
          "name": "Novembro",
          "receita": 8538.89,
          "fixa": 3748.75,
          "variavel": 1366.96,
          "invest": 1000.0,
          "sobra": 2423.18,
          "status": "Orçado / Meta"
        },
        {
          "name": "Dezembro",
          "receita": 12482.69,
          "fixa": 3765.97,
          "variavel": 1745.78,
          "invest": 1000.0,
          "sobra": 5970.94,
          "status": "Orçado / Meta"
        }
      ],
      "limites_orcados": [
        {
          "linha": 17,
          "categoria": "Contas Casal (lazer, depesas, compras, etc).",
          "julho": 618.0,
          "agosto": 768.49,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 18,
          "categoria": "Alice (gastos extras)",
          "julho": 240.0,
          "agosto": 36.39,
          "setembro": 240.0,
          "outubro": 240.0,
          "novembro": 240.0,
          "dezembro": 240.0,
          "mediaFutura": 240.0
        },
        {
          "linha": 19,
          "categoria": "Advogados (boleto/mensal)",
          "julho": 0.0,
          "agosto": 0.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 20,
          "categoria": "Ajuda casa (pix/mensal)",
          "julho": 0.0,
          "agosto": 0.0,
          "setembro": 250.0,
          "outubro": 250.0,
          "novembro": 250.0,
          "dezembro": 250.0,
          "mediaFutura": 250.0
        },
        {
          "linha": 21,
          "categoria": "Alimentação trabalho (limite)",
          "julho": 269.83,
          "agosto": 464.63,
          "setembro": 220.0,
          "outubro": 220.0,
          "novembro": 220.0,
          "dezembro": 220.0,
          "mediaFutura": 220.0
        },
        {
          "linha": 22,
          "categoria": "Combustível (limite)",
          "julho": 498.82,
          "agosto": 369.45,
          "setembro": 650.0,
          "outubro": 650.0,
          "novembro": 650.0,
          "dezembro": 650.0,
          "mediaFutura": 650.0
        },
        {
          "linha": 23,
          "categoria": "Débitos carro",
          "julho": 0.0,
          "agosto": 0.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 167.74,
          "mediaFutura": 41.94
        },
        {
          "linha": 24,
          "categoria": "Despesas casa",
          "julho": 26.85,
          "agosto": 17.9,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 25,
          "categoria": "Estacionamento (limite)",
          "julho": 60.0,
          "agosto": 130.0,
          "setembro": 90.0,
          "outubro": 90.0,
          "novembro": 90.0,
          "dezembro": 90.0,
          "mediaFutura": 90.0
        },
        {
          "linha": 26,
          "categoria": "Farmácia",
          "julho": 72.67,
          "agosto": 75.61,
          "setembro": 50.0,
          "outubro": 50.0,
          "novembro": 50.0,
          "dezembro": 50.0,
          "mediaFutura": 50.0
        },
        {
          "linha": 27,
          "categoria": "Manutenção carro",
          "julho": 754.03,
          "agosto": 416.75,
          "setembro": 283.68,
          "outubro": 283.68,
          "novembro": 238.13,
          "dezembro": 227.61,
          "mediaFutura": 258.27
        },
        {
          "linha": 28,
          "categoria": "Mercado (limite)",
          "julho": 159.91,
          "agosto": 155.81,
          "setembro": 200.0,
          "outubro": 200.0,
          "novembro": 200.0,
          "dezembro": 200.0,
          "mediaFutura": 200.0
        },
        {
          "linha": 29,
          "categoria": "Pensão alimentícia (holerite)",
          "julho": 1308.22,
          "agosto": 1339.84,
          "setembro": 1271.83,
          "outubro": 1271.83,
          "novembro": 1271.83,
          "dezembro": 1271.83,
          "mediaFutura": 1271.83
        },
        {
          "linha": 30,
          "categoria": "Recarga celular (boleto/mensal)",
          "julho": 98.43,
          "agosto": 99.0,
          "setembro": 99.0,
          "outubro": 99.0,
          "novembro": 99.0,
          "dezembro": 99.0,
          "mediaFutura": 99.0
        },
        {
          "linha": 31,
          "categoria": "Saúde",
          "julho": 140.0,
          "agosto": 0.0,
          "setembro": 140.0,
          "outubro": 0.0,
          "novembro": 140.0,
          "dezembro": 0.0,
          "mediaFutura": 70.0
        },
        {
          "linha": 32,
          "categoria": "Seguro de vida (holerite)",
          "julho": 82.15,
          "agosto": 85.56,
          "setembro": 82.15,
          "outubro": 82.15,
          "novembro": 82.15,
          "dezembro": 82.15,
          "mediaFutura": 82.15
        },
        {
          "linha": 33,
          "categoria": "Uber / Transporte (limite)",
          "julho": 47.96,
          "agosto": 86.66,
          "setembro": 100.0,
          "outubro": 100.0,
          "novembro": 100.0,
          "dezembro": 100.0,
          "mediaFutura": 100.0
        },
        {
          "linha": 34,
          "categoria": "Obra",
          "julho": 2840.9,
          "agosto": 2131.77,
          "setembro": 1143.77,
          "outubro": 423.88,
          "novembro": 117.64,
          "dezembro": 117.64,
          "mediaFutura": 450.73
        },
        {
          "linha": 35,
          "categoria": "Outros",
          "julho": 356.98,
          "agosto": 0.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 36,
          "categoria": "Essencial",
          "julho": 7574.75,
          "agosto": 6177.86,
          "setembro": 4820.43,
          "outubro": 3960.54,
          "novembro": 3748.75,
          "dezembro": 3765.97,
          "mediaFutura": 4073.92
        },
        {
          "linha": 37,
          "categoria": "Essencial/Receita",
          "julho": 0.7683408767,
          "agosto": 0.67306188,
          "setembro": 0.5453659905,
          "outubro": 0.4966885673,
          "novembro": 0.4390207627,
          "dezembro": 0.3016953878,
          "mediaFutura": 0.45
        },
        {
          "linha": 38,
          "categoria": "ESTILO DE VIDA",
          "julho": 0.0,
          "agosto": 0.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 39,
          "categoria": "Academia (crédito/mensal)",
          "julho": 54.99,
          "agosto": 54.99,
          "setembro": 54.99,
          "outubro": 54.99,
          "novembro": 54.99,
          "dezembro": 54.99,
          "mediaFutura": 54.99
        },
        {
          "linha": 40,
          "categoria": "Acessórios",
          "julho": 0.0,
          "agosto": 0.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 41,
          "categoria": "Artigos/Eletrônicos",
          "julho": 0.0,
          "agosto": 20.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 42,
          "categoria": "Assinaturas/Anuidades (crédito/mensal)",
          "julho": 22.92,
          "agosto": 61.02,
          "setembro": 37.23,
          "outubro": 37.23,
          "novembro": 22.4,
          "dezembro": 5.9,
          "mediaFutura": 25.69
        },
        {
          "linha": 43,
          "categoria": "Eletrodomésticos/Móveis",
          "julho": 0.0,
          "agosto": 0.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 44,
          "categoria": "Estudos",
          "julho": 96.99,
          "agosto": 96.99,
          "setembro": 96.99,
          "outubro": 96.99,
          "novembro": 96.99,
          "dezembro": 96.99,
          "mediaFutura": 96.99
        },
        {
          "linha": 45,
          "categoria": "Lazer (limite)",
          "julho": 684.36,
          "agosto": 1008.59,
          "setembro": 1000.0,
          "outubro": 1000.0,
          "novembro": 1000.0,
          "dezembro": 1500.0,
          "mediaFutura": 1125.0
        },
        {
          "linha": 46,
          "categoria": "Presentes",
          "julho": 61.98,
          "agosto": 104.68,
          "setembro": 104.68,
          "outubro": 104.68,
          "novembro": 104.68,
          "dezembro": 0.0,
          "mediaFutura": 78.51
        },
        {
          "linha": 47,
          "categoria": "Barbeiro",
          "julho": 76.9,
          "agosto": 87.9,
          "setembro": 87.9,
          "outubro": 87.9,
          "novembro": 87.9,
          "dezembro": 87.9,
          "mediaFutura": 87.9
        },
        {
          "linha": 48,
          "categoria": "Vestuário",
          "julho": 251.21,
          "agosto": 142.95,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 49,
          "categoria": "Viagens",
          "julho": 0.0,
          "agosto": 0.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 50,
          "categoria": "Outros",
          "julho": 31.43,
          "agosto": 0.0,
          "setembro": 0.0,
          "outubro": 0.0,
          "novembro": 0.0,
          "dezembro": 0.0,
          "mediaFutura": 0.0
        },
        {
          "linha": 51,
          "categoria": "Estilo de vida",
          "julho": 1280.78,
          "agosto": 1577.12,
          "setembro": 1381.79,
          "outubro": 1381.79,
          "novembro": 1366.96,
          "dezembro": 1745.78,
          "mediaFutura": 1469.08
        }
      ]
    },
    "2027": {
      "sheet": "Orçamento 2027",
      "months": [
        {
          "name": "Janeiro",
          "receita": 8539.66,
          "fixa": 3908.23,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Fevereiro",
          "receita": 8539.66,
          "fixa": 3908.23,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Março",
          "receita": 8539.66,
          "fixa": 3908.23,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Abril",
          "receita": 9539.66,
          "fixa": 3908.23,
          "variavel": 1234.78,
          "invest": 0.1,
          "sobra": 0.0
        },
        {
          "name": "Maio",
          "receita": 8539.66,
          "fixa": 3790.59,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Junho",
          "receita": 8002.4,
          "fixa": 3550.59,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Julho",
          "receita": 8539.66,
          "fixa": 3550.59,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Agosto",
          "receita": 8539.66,
          "fixa": 3550.59,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Setembro",
          "receita": 8539.66,
          "fixa": 3550.59,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Outubro",
          "receita": 8539.66,
          "fixa": 3550.59,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Novembro",
          "receita": 8539.66,
          "fixa": 3550.59,
          "variavel": 1234.78,
          "invest": 0.12,
          "sobra": 0.0
        },
        {
          "name": "Dezembro",
          "receita": 12483.46,
          "fixa": 3718.33,
          "variavel": 1734.78,
          "invest": 0.08,
          "sobra": 0.0
        }
      ],
      "receitas_itens": [
        {
          "row": 4,
          "label": "Salário Líquido",
          "valores": [
            4228.25,
            4228.25,
            4228.25,
            4228.25,
            4228.25,
            4228.25,
            4228.25,
            4228.25,
            4228.25,
            4228.25,
            4228.25,
            4228.25
          ]
        },
        {
          "row": 5,
          "label": "Insalubridade",
          "valores": [
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67,
            785.67
          ]
        },
        {
          "row": 6,
          "label": "Ajuda Custo Alim (UFESP R$38,42)",
          "valores": [
            888.48,
            888.48,
            888.48,
            888.48,
            888.48,
            888.48,
            888.48,
            888.48,
            888.48,
            888.48,
            888.48,
            888.48
          ]
        },
        {
          "row": 7,
          "label": "Quinquênio",
          "valores": [
            537.26,
            537.26,
            537.26,
            537.26,
            537.26,
            0.0,
            537.26,
            537.26,
            537.26,
            537.26,
            537.26,
            537.26
          ]
        },
        {
          "row": 8,
          "label": "DEJEM / DELEGADA",
          "valores": [
            2100.0,
            2100.0,
            2100.0,
            2100.0,
            2100.0,
            2100.0,
            2100.0,
            2100.0,
            2100.0,
            2100.0,
            2100.0,
            2100.0
          ]
        },
        {
          "row": 9,
          "label": "Férias",
          "valores": [
            0.0,
            0.0,
            0.0,
            1000.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 10,
          "label": "13º Salário",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            3943.8
          ]
        },
        {
          "row": 11,
          "label": "Renda extra",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 12,
          "label": "Sobra Mensal",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 13,
          "label": "Acerto Casal",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 14,
          "label": "Outros",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        }
      ],
      "fixas_itens": [
        {
          "row": 17,
          "label": "Acerto Casal (lazer, depesas, compras, etc).",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 18,
          "label": "Alice (gastos extras)",
          "valores": [
            240.0,
            240.0,
            240.0,
            240.0,
            240.0,
            240.0,
            240.0,
            240.0,
            240.0,
            240.0,
            240.0,
            240.0
          ]
        },
        {
          "row": 19,
          "label": "Advogados (boleto/mensal)",
          "valores": [
            250.0,
            250.0,
            250.0,
            250.0,
            250.0,
            250.0,
            250.0,
            250.0,
            250.0,
            250.0,
            250.0,
            250.0
          ]
        },
        {
          "row": 20,
          "label": "Alimentação trabalho (limite)",
          "valores": [
            220.0,
            220.0,
            220.0,
            220.0,
            220.0,
            220.0,
            220.0,
            220.0,
            220.0,
            220.0,
            220.0,
            220.0
          ]
        },
        {
          "row": 21,
          "label": "Combustível (limite)",
          "valores": [
            650.0,
            650.0,
            650.0,
            650.0,
            650.0,
            650.0,
            650.0,
            650.0,
            650.0,
            650.0,
            650.0,
            650.0
          ]
        },
        {
          "row": 22,
          "label": "Débitos carro",
          "valores": [
            240.0,
            240.0,
            240.0,
            240.0,
            240.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            167.74
          ]
        },
        {
          "row": 23,
          "label": "Despesas casa",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 24,
          "label": "Estacionamento (limite)",
          "valores": [
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0,
            60.0
          ]
        },
        {
          "row": 25,
          "label": "Farmácia",
          "valores": [
            50.0,
            50.0,
            50.0,
            50.0,
            50.0,
            50.0,
            50.0,
            50.0,
            50.0,
            50.0,
            50.0,
            50.0
          ]
        },
        {
          "row": 26,
          "label": "Manutenção carro",
          "valores": [
            227.61,
            227.61,
            227.61,
            227.61,
            227.61,
            227.61,
            227.61,
            227.61,
            227.61,
            227.61,
            227.61,
            227.61
          ]
        },
        {
          "row": 27,
          "label": "Mercado (limite)",
          "valores": [
            300.0,
            300.0,
            300.0,
            300.0,
            300.0,
            300.0,
            300.0,
            300.0,
            300.0,
            300.0,
            300.0,
            300.0
          ]
        },
        {
          "row": 28,
          "label": "Pensão alimentícia (holerite)",
          "valores": [
            1271.83,
            1271.83,
            1271.83,
            1271.83,
            1271.83,
            1271.83,
            1271.83,
            1271.83,
            1271.83,
            1271.83,
            1271.83,
            1271.83
          ]
        },
        {
          "row": 29,
          "label": "Recarga celular (boleto/mensal)",
          "valores": [
            99.0,
            99.0,
            99.0,
            99.0,
            99.0,
            99.0,
            99.0,
            99.0,
            99.0,
            99.0,
            99.0,
            99.0
          ]
        },
        {
          "row": 30,
          "label": "Saúde",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 31,
          "label": "Seguro de vida (holerite)",
          "valores": [
            82.15,
            82.15,
            82.15,
            82.15,
            82.15,
            82.15,
            82.15,
            82.15,
            82.15,
            82.15,
            82.15,
            82.15
          ]
        },
        {
          "row": 32,
          "label": "Uber / Transporte (limite)",
          "valores": [
            100.0,
            100.0,
            100.0,
            100.0,
            100.0,
            100.0,
            100.0,
            100.0,
            100.0,
            100.0,
            100.0,
            100.0
          ]
        },
        {
          "row": 33,
          "label": "Obra",
          "valores": [
            117.64,
            117.64,
            117.64,
            117.64,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 34,
          "label": "Outros",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        }
      ],
      "variaveis_itens": [
        {
          "row": 38,
          "label": "Academia (crédito/mensal)",
          "valores": [
            54.99,
            54.99,
            54.99,
            54.99,
            54.99,
            54.99,
            54.99,
            54.99,
            54.99,
            54.99,
            54.99,
            54.99
          ]
        },
        {
          "row": 39,
          "label": "Acessórios",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 40,
          "label": "Artigos/Eletrônicos",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 41,
          "label": "Assinaturas/Anuidades (crédito/mensal)",
          "valores": [
            5.9,
            5.9,
            5.9,
            5.9,
            5.9,
            5.9,
            5.9,
            5.9,
            5.9,
            5.9,
            5.9,
            5.9
          ]
        },
        {
          "row": 42,
          "label": "Eletrodomésticos/Móveis",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 43,
          "label": "Estudos",
          "valores": [
            96.99,
            96.99,
            96.99,
            96.99,
            96.99,
            96.99,
            96.99,
            96.99,
            96.99,
            96.99,
            96.99,
            96.99
          ]
        },
        {
          "row": 44,
          "label": "Lazer (limite)",
          "valores": [
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1500.0
          ]
        },
        {
          "row": 45,
          "label": "Presentes",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 46,
          "label": "Barbeiro",
          "valores": [
            76.9,
            76.9,
            76.9,
            76.9,
            76.9,
            76.9,
            76.9,
            76.9,
            76.9,
            76.9,
            76.9,
            76.9
          ]
        },
        {
          "row": 47,
          "label": "Vestuário",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 48,
          "label": "Viagens",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 49,
          "label": "Outros",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        }
      ],
      "invest_itens": [
        {
          "row": 54,
          "label": "Pai Obra",
          "valores": [
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0
          ]
        },
        {
          "row": 55,
          "label": "Metas financeiras",
          "valores": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ]
        },
        {
          "row": 56,
          "label": "Investimentos",
          "valores": [
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0,
            1000.0
          ]
        }
      ]
    }
  },
  "cartaoOutubro": {
  "titulo": "Fatura Outubro - vencimento 10/10",
  "atualizadoEm": "14/09/2026",
  "mes": "Outubro",
  "total": 3026.42,
  "limiteDisponivel": 3878.89,
  "compras": [
    {
      "id": "c-out-3",
      "linha": 4,
      "oQue": "Assinaturas/Anuidades",
      "euPago": 16.5,
      "valor": 16.5,
      "parcelaAtual": "11",
      "numParcelas": "12",
      "motivo": "anuidade",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-4",
      "linha": 5,
      "oQue": "Manutenção carro",
      "euPago": 45.55,
      "valor": 45.55,
      "parcelaAtual": "6",
      "numParcelas": "6",
      "motivo": "Funilaria carro",
      "cartao": "C/C Nubank"
    },
    {
      "id": "c-out-5",
      "linha": 6,
      "oQue": "Manutenção carro",
      "euPago": 10.52,
      "valor": 10.52,
      "parcelaAtual": "9",
      "numParcelas": "10",
      "motivo": "calotinha",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-6",
      "linha": 7,
      "oQue": "Obra",
      "euPago": 12.92,
      "valor": 12.92,
      "parcelaAtual": "4",
      "numParcelas": "7",
      "motivo": "Materiais",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-7",
      "linha": 8,
      "oQue": "Obra",
      "euPago": 104.72,
      "valor": 104.72,
      "parcelaAtual": "4",
      "numParcelas": "10",
      "motivo": "Materiais",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-8",
      "linha": 9,
      "oQue": "Obra",
      "euPago": 306.24,
      "valor": 306.24,
      "parcelaAtual": "4",
      "numParcelas": "4",
      "motivo": "Materiais",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-9",
      "linha": 10,
      "oQue": "Presentes",
      "euPago": 104.68,
      "valor": 104.68,
      "parcelaAtual": "4",
      "numParcelas": "5",
      "motivo": "Jaquetas (namorados)",
      "cartao": "C/C Emporio Alex"
    },
    {
      "id": "c-out-10",
      "linha": 11,
      "oQue": "Obra",
      "euPago": 324.94,
      "valor": 324.94,
      "parcelaAtual": "2",
      "numParcelas": "10",
      "motivo": "Materiais",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-11",
      "linha": 12,
      "oQue": "Obra",
      "euPago": 133.3,
      "valor": 133.36,
      "parcelaAtual": "2",
      "numParcelas": "10",
      "motivo": "Carro peça",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-12",
      "linha": 13,
      "oQue": "Obra",
      "euPago": 177.77,
      "valor": 177.81,
      "parcelaAtual": "2",
      "numParcelas": "10",
      "motivo": "Materiais",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-13",
      "linha": 14,
      "oQue": "Estudos",
      "euPago": 96.99,
      "valor": 96.99,
      "parcelaAtual": "(mensal)",
      "numParcelas": "(mensal)",
      "motivo": "IA GOOGLE",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-14",
      "linha": 15,
      "oQue": "Academia (mensal)",
      "euPago": 54.99,
      "valor": 54.99,
      "parcelaAtual": "-",
      "numParcelas": "-",
      "motivo": "Gympass",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-15",
      "linha": 16,
      "oQue": "Assinaturas/Anuidades",
      "euPago": 5.9,
      "valor": 5.9,
      "parcelaAtual": "-",
      "numParcelas": "-",
      "motivo": "ICLOUD",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-16",
      "linha": 17,
      "oQue": "Barbeiro (limite)",
      "euPago": 87.9,
      "valor": 87.9,
      "parcelaAtual": "-",
      "numParcelas": "-",
      "motivo": "Barbeiro assinatura",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-17",
      "linha": 18,
      "oQue": "Manutenção carro",
      "euPago": 227.61,
      "valor": 227.61,
      "parcelaAtual": "-",
      "numParcelas": "-",
      "motivo": "SEGURO TICO",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-18",
      "linha": 19,
      "oQue": "Uber / Transporte (limite)",
      "euPago": 17.95,
      "valor": 17.95,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Uber",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-19",
      "linha": 20,
      "oQue": "Alimentação trabalho (limite)",
      "euPago": 156.74,
      "valor": 156.74,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Almoço mensal",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-20",
      "linha": 21,
      "oQue": "Lazer (limite)",
      "euPago": 49.9,
      "valor": 49.9,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "App lazer",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-21",
      "linha": 22,
      "oQue": "Obra",
      "euPago": 138.5,
      "valor": 138.5,
      "parcelaAtual": "1",
      "numParcelas": "10",
      "motivo": "Móveis",
      "cartao": "C/C Itaú"
    },
    {
      "id": "c-out-22",
      "linha": 23,
      "oQue": "Lazer (limite)",
      "euPago": 114.36,
      "valor": 114.36,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Comida mexicana",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-23",
      "linha": 24,
      "oQue": "Estacionamento (limite)",
      "euPago": 18.0,
      "valor": 18.0,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Estacionamento",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-24",
      "linha": 25,
      "oQue": "Combustível (limite)",
      "euPago": 112.57,
      "valor": 112.57,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Gasolina",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-25",
      "linha": 26,
      "oQue": "Lazer (limite)",
      "euPago": 138.99,
      "valor": 138.99,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Bar",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-26",
      "linha": 27,
      "oQue": "Lazer (limite)",
      "euPago": 153.1,
      "valor": 153.1,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Bar",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-27",
      "linha": 28,
      "oQue": "Farmácia",
      "euPago": 24.99,
      "valor": 24.99,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Farmácia",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-28",
      "linha": 29,
      "oQue": "Estacionamento (limite)",
      "euPago": 15.0,
      "valor": 15.0,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Estacionamento",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-29",
      "linha": 30,
      "oQue": "Alimentação trabalho (limite)",
      "euPago": 12.0,
      "valor": 12.0,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Café da manhã trabalho",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-30",
      "linha": 31,
      "oQue": "Combustível (limite)",
      "euPago": 100.0,
      "valor": 100.0,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Gasolina",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-31",
      "linha": 32,
      "oQue": "Alimentação trabalho (limite)",
      "euPago": 35.0,
      "valor": 35.0,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Almoço trabalho",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-32",
      "linha": 33,
      "oQue": "Combustível (limite)",
      "euPago": 131.19,
      "valor": 131.19,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Gasolina viagem",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-33",
      "linha": 34,
      "oQue": "Lazer (limite)",
      "euPago": 16.2,
      "valor": 16.2,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Comida viagem",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-34",
      "linha": 35,
      "oQue": "Estacionamento (limite)",
      "euPago": 15.0,
      "valor": 15.0,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Estacionamento",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-35",
      "linha": 36,
      "oQue": "Alimentação trabalho (limite)",
      "euPago": 5.07,
      "valor": 5.07,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Café da manhã trabalho",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-36",
      "linha": 37,
      "oQue": "Estacionamento (limite)",
      "euPago": 15.0,
      "valor": 15.0,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Estacionamento",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-37",
      "linha": 38,
      "oQue": "Alimentação trabalho (limite)",
      "euPago": 13.75,
      "valor": 13.75,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Café da manhã estacionamento",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-38",
      "linha": 39,
      "oQue": "Assinaturas/Anuidades",
      "euPago": 14.75,
      "valor": 14.75,
      "parcelaAtual": "3",
      "numParcelas": "12",
      "motivo": "Hostgator mensalidade sites",
      "cartao": "C/C BB"
    },
    {
      "id": "c-out-39",
      "linha": 40,
      "oQue": "Alimentação trabalho (limite)",
      "euPago": 17.83,
      "valor": 17.83,
      "parcelaAtual": "1",
      "numParcelas": "1",
      "motivo": "Café",
      "cartao": "C/C BB"
    }
  ]
},
  "cartaoAgosto": {
    "titulo": "Fatura Agosto - vencimento 10/08",
    "atualizadoEm": "11/07/2026",
    "total": 5425.71,
    "limiteDisponivel": 12000.0,
    "compras": [
      {
        "id": "c-4",
        "linha": 4,
        "oQue": "Academia (mensal)",
        "euPago": 54.99,
        "valor": 54.99,
        "parcelaAtual": "-",
        "numParcelas": "-",
        "motivo": "Gympass",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-5",
        "linha": 5,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 8.96,
        "valor": 8.96,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-6",
        "linha": 6,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 57.0,
        "valor": 57.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Almoço",
        "cartao": "C/C BB"
      },
      {
        "id": "c-7",
        "linha": 7,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 15.78,
        "valor": 15.78,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-8",
        "linha": 8,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 90.0,
        "valor": 90.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Almoço",
        "cartao": "C/C BB"
      },
      {
        "id": "c-9",
        "linha": 9,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 23.98,
        "valor": 23.98,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Almoço",
        "cartao": "C/C BB"
      },
      {
        "id": "c-10",
        "linha": 10,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 30.0,
        "valor": 30.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Almoço",
        "cartao": "C/C BB"
      },
      {
        "id": "c-11",
        "linha": 11,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 21.92,
        "valor": 21.92,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-12",
        "linha": 12,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 25.0,
        "valor": 25.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Almoço",
        "cartao": "C/C BB"
      },
      {
        "id": "c-13",
        "linha": 13,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 17.46,
        "valor": 17.46,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-14",
        "linha": 14,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 7.92,
        "valor": 7.92,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-15",
        "linha": 15,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 12.0,
        "valor": 12.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Almoço",
        "cartao": "C/C BB"
      },
      {
        "id": "c-16",
        "linha": 16,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 17.0,
        "valor": 17.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-17",
        "linha": 17,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 30.0,
        "valor": 30.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-18",
        "linha": 18,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 42.95,
        "valor": 42.95,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-19",
        "linha": 19,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 11.2,
        "valor": 11.2,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-20",
        "linha": 20,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 16.0,
        "valor": 16.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-21",
        "linha": 21,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 12.0,
        "valor": 12.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-22",
        "linha": 22,
        "oQue": "Alimentação trabalho (limite)",
        "euPago": 25.46,
        "valor": 25.46,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Cafe",
        "cartao": "C/C BB"
      },
      {
        "id": "c-23",
        "linha": 23,
        "oQue": "Artigos/Eletrônicos",
        "euPago": 20.0,
        "valor": 20.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "cabo celular",
        "cartao": "C/C BB"
      },
      {
        "id": "c-24",
        "linha": 24,
        "oQue": "Assinaturas/Anuidades",
        "euPago": 16.5,
        "valor": 16.5,
        "parcelaAtual": "9.0",
        "numParcelas": "12.0",
        "motivo": "anuidade",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-25",
        "linha": 25,
        "oQue": "Assinaturas/Anuidades",
        "euPago": 5.9,
        "valor": 5.9,
        "parcelaAtual": "-",
        "numParcelas": "-",
        "motivo": "ICLOUD",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-26",
        "linha": 26,
        "oQue": "Assinaturas/Anuidades",
        "euPago": 2.89,
        "valor": 2.89,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Multa atraso",
        "cartao": "C/C Nubank"
      },
      {
        "id": "c-27",
        "linha": 27,
        "oQue": "Assinaturas/Anuidades",
        "euPago": 20.9,
        "valor": 20.9,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "netflix",
        "cartao": "C/C BB"
      },
      {
        "id": "c-28",
        "linha": 28,
        "oQue": "Assinaturas/Anuidades",
        "euPago": 14.83,
        "valor": 14.83,
        "parcelaAtual": "12.0",
        "numParcelas": "1.0",
        "motivo": "Hospedagem site",
        "cartao": "C/C BB"
      },
      {
        "id": "c-29",
        "linha": 29,
        "oQue": "Barbeiro (limite)",
        "euPago": 87.9,
        "valor": 87.9,
        "parcelaAtual": "-",
        "numParcelas": "-",
        "motivo": "Barbeiro assinatura",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-30",
        "linha": 30,
        "oQue": "Combustível (limite)",
        "euPago": 132.0,
        "valor": 132.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Gasolina",
        "cartao": "C/C BB"
      },
      {
        "id": "c-31",
        "linha": 31,
        "oQue": "Combustível (limite)",
        "euPago": 113.73,
        "valor": 113.73,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Gasolina",
        "cartao": "C/C BB"
      },
      {
        "id": "c-32",
        "linha": 32,
        "oQue": "Combustível (limite)",
        "euPago": 83.72,
        "valor": 83.72,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Gasolina",
        "cartao": "C/C BB"
      },
      {
        "id": "c-33",
        "linha": 33,
        "oQue": "Combustível (limite)",
        "euPago": 40.0,
        "valor": 40.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Gasolina",
        "cartao": "C/C BB"
      },
      {
        "id": "c-34",
        "linha": 34,
        "oQue": "Despesas casa",
        "euPago": 17.9,
        "valor": 17.9,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Lavanderia",
        "cartao": "C/C BB"
      },
      {
        "id": "c-35",
        "linha": 35,
        "oQue": "Estacionamento (limite)",
        "euPago": 10.0,
        "valor": 10.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-36",
        "linha": 36,
        "oQue": "Estacionamento (limite)",
        "euPago": 15.0,
        "valor": 15.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-37",
        "linha": 37,
        "oQue": "Estacionamento (limite)",
        "euPago": 15.0,
        "valor": 15.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-38",
        "linha": 38,
        "oQue": "Estacionamento (limite)",
        "euPago": 15.0,
        "valor": 15.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-39",
        "linha": 39,
        "oQue": "Estacionamento (limite)",
        "euPago": 15.0,
        "valor": 15.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-40",
        "linha": 40,
        "oQue": "Estacionamento (limite)",
        "euPago": 15.0,
        "valor": 15.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-41",
        "linha": 41,
        "oQue": "Estacionamento (limite)",
        "euPago": 10.0,
        "valor": 10.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-42",
        "linha": 42,
        "oQue": "Estacionamento (limite)",
        "euPago": 10.0,
        "valor": 10.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-43",
        "linha": 43,
        "oQue": "Estacionamento (limite)",
        "euPago": 10.0,
        "valor": 10.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-44",
        "linha": 44,
        "oQue": "Estacionamento (limite)",
        "euPago": 15.0,
        "valor": 15.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Estacionamento",
        "cartao": "C/C BB"
      },
      {
        "id": "c-45",
        "linha": 45,
        "oQue": "Estudos",
        "euPago": 96.99,
        "valor": 96.99,
        "parcelaAtual": "(mensal)",
        "numParcelas": "(mensal)",
        "motivo": "IA GOOGLE",
        "cartao": "C/C BB"
      },
      {
        "id": "c-46",
        "linha": 46,
        "oQue": "Farmácia",
        "euPago": 63.64,
        "valor": 63.64,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Remedio emily",
        "cartao": "C/C BB"
      },
      {
        "id": "c-47",
        "linha": 47,
        "oQue": "Farmácia",
        "euPago": 11.98,
        "valor": 11.98,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Remedio",
        "cartao": "C/C BB"
      },
      {
        "id": "c-48",
        "linha": 48,
        "oQue": "Lazer (limite)",
        "euPago": 98.0,
        "valor": 98.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Pizza",
        "cartao": "C/C BB"
      },
      {
        "id": "c-49",
        "linha": 49,
        "oQue": "Lazer (limite)",
        "euPago": 298.7,
        "valor": 298.7,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Restaurante",
        "cartao": "C/C BB"
      },
      {
        "id": "c-50",
        "linha": 50,
        "oQue": "Lazer (limite)",
        "euPago": 62.2,
        "valor": 62.2,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Padaria",
        "cartao": "C/C BB"
      },
      {
        "id": "c-51",
        "linha": 51,
        "oQue": "Lazer (limite)",
        "euPago": 108.0,
        "valor": 108.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Almoço",
        "cartao": "C/C BB"
      },
      {
        "id": "c-52",
        "linha": 52,
        "oQue": "Lazer (limite)",
        "euPago": 89.0,
        "valor": 89.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Almoço",
        "cartao": "C/C BB"
      },
      {
        "id": "c-53",
        "linha": 53,
        "oQue": "Lazer (limite)",
        "euPago": 9.5,
        "valor": 9.5,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Pao de batata",
        "cartao": "C/C BB"
      },
      {
        "id": "c-54",
        "linha": 54,
        "oQue": "Lazer (limite)",
        "euPago": 46.8,
        "valor": 46.8,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Comida",
        "cartao": "C/C BB"
      },
      {
        "id": "c-55",
        "linha": 55,
        "oQue": "Lazer (limite)",
        "euPago": 46.0,
        "valor": 46.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Sorvete",
        "cartao": "C/C BB"
      },
      {
        "id": "c-56",
        "linha": 56,
        "oQue": "Lazer (limite)",
        "euPago": 90.0,
        "valor": 90.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Quisque",
        "cartao": "C/C BB"
      },
      {
        "id": "c-57",
        "linha": 57,
        "oQue": "Lazer (limite)",
        "euPago": 10.9,
        "valor": 10.9,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Energetico",
        "cartao": "C/C BB"
      },
      {
        "id": "c-58",
        "linha": 58,
        "oQue": "Lazer (limite)",
        "euPago": 45.5,
        "valor": 45.5,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Comida",
        "cartao": "C/C BB"
      },
      {
        "id": "c-59",
        "linha": 59,
        "oQue": "Lazer (limite)",
        "euPago": 26.0,
        "valor": 26.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Pastel",
        "cartao": "C/C BB"
      },
      {
        "id": "c-60",
        "linha": 60,
        "oQue": "Lazer (limite)",
        "euPago": 48.99,
        "valor": 48.99,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "comida",
        "cartao": "C/C BB"
      },
      {
        "id": "c-61",
        "linha": 61,
        "oQue": "Lazer (limite)",
        "euPago": 29.0,
        "valor": 29.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "comida",
        "cartao": "C/C BB"
      },
      {
        "id": "c-62",
        "linha": 62,
        "oQue": "Manutenção carro",
        "euPago": 45.55,
        "valor": 45.55,
        "parcelaAtual": "4.0",
        "numParcelas": "6.0",
        "motivo": "Funilaria carro",
        "cartao": "C/C Nubank"
      },
      {
        "id": "c-63",
        "linha": 63,
        "oQue": "Manutenção carro",
        "euPago": 10.52,
        "valor": 10.52,
        "parcelaAtual": "7.0",
        "numParcelas": "10.0",
        "motivo": "calotinha",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-64",
        "linha": 64,
        "oQue": "Manutenção carro",
        "euPago": 227.61,
        "valor": 227.61,
        "parcelaAtual": "-",
        "numParcelas": "-",
        "motivo": "SEGURO TICO",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-65",
        "linha": 65,
        "oQue": "Manutenção carro",
        "euPago": 133.07,
        "valor": 133.07,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Carro peça",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-66",
        "linha": 66,
        "oQue": "Mercado (limite)",
        "euPago": 17.9,
        "valor": 17.9,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Padaria",
        "cartao": "C/C BB"
      },
      {
        "id": "c-67",
        "linha": 67,
        "oQue": "Mercado (limite)",
        "euPago": 137.91,
        "valor": 137.91,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "mercado",
        "cartao": "C/C BB"
      },
      {
        "id": "c-68",
        "linha": 68,
        "oQue": "Obra",
        "euPago": 12.92,
        "valor": 12.92,
        "parcelaAtual": "2.0",
        "numParcelas": "7.0",
        "motivo": "Materiais",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-69",
        "linha": 69,
        "oQue": "Obra",
        "euPago": 104.72,
        "valor": 104.72,
        "parcelaAtual": "2.0",
        "numParcelas": "10.0",
        "motivo": "Materiais",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-70",
        "linha": 70,
        "oQue": "Obra",
        "euPago": 49.54,
        "valor": 49.54,
        "parcelaAtual": "2.0",
        "numParcelas": "3.0",
        "motivo": "Materiais",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-71",
        "linha": 71,
        "oQue": "Obra",
        "euPago": 306.24,
        "valor": 306.24,
        "parcelaAtual": "2.0",
        "numParcelas": "4.0",
        "motivo": "Materiais",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-72",
        "linha": 72,
        "oQue": "Obra",
        "euPago": 250.35,
        "valor": 250.35,
        "parcelaAtual": "2.0",
        "numParcelas": "3.0",
        "motivo": "Eletrica material",
        "cartao": "C/C BB"
      },
      {
        "id": "c-73",
        "linha": 73,
        "oQue": "Obra",
        "euPago": 141.5,
        "valor": 141.5,
        "parcelaAtual": "8.0",
        "numParcelas": "8.0",
        "motivo": "Materiais",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-74",
        "linha": 74,
        "oQue": "Obra",
        "euPago": 420.0,
        "valor": 420.0,
        "parcelaAtual": "9.0",
        "numParcelas": "10.0",
        "motivo": "Laje",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-75",
        "linha": 75,
        "oQue": "Obra",
        "euPago": 211.06,
        "valor": 211.06,
        "parcelaAtual": "10.0",
        "numParcelas": "10.0",
        "motivo": "Materiais",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-76",
        "linha": 76,
        "oQue": "Obra",
        "euPago": 310.2,
        "valor": 310.2,
        "parcelaAtual": "10.0",
        "numParcelas": "10.0",
        "motivo": "Materiais",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-77",
        "linha": 77,
        "oQue": "Obra",
        "euPago": 112.76,
        "valor": 112.76,
        "parcelaAtual": "10.0",
        "numParcelas": "10.0",
        "motivo": "Materiais",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-78",
        "linha": 78,
        "oQue": "Obra",
        "euPago": 48.9,
        "valor": 48.9,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Material pintura",
        "cartao": "C/C BB"
      },
      {
        "id": "c-79",
        "linha": 79,
        "oQue": "Obra",
        "euPago": 25.0,
        "valor": 25.0,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Material pintura",
        "cartao": "C/C BB"
      },
      {
        "id": "c-80",
        "linha": 80,
        "oQue": "Obra",
        "euPago": 25.6,
        "valor": 25.6,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Material pintura",
        "cartao": "C/C BB"
      },
      {
        "id": "c-81",
        "linha": 81,
        "oQue": "Obra",
        "euPago": 112.98,
        "valor": 112.98,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Material pintura",
        "cartao": "C/C BB"
      },
      {
        "id": "c-82",
        "linha": 82,
        "oQue": "Presentes",
        "euPago": 104.68,
        "valor": 104.68,
        "parcelaAtual": "2.0",
        "numParcelas": "5.0",
        "motivo": "Jaquetas (namorados)",
        "cartao": "C/C Emporio Alex"
      },
      {
        "id": "c-83",
        "linha": 83,
        "oQue": "Uber / Transporte (limite)",
        "euPago": 16.98,
        "valor": 16.98,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Uber",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-84",
        "linha": 84,
        "oQue": "Uber / Transporte (limite)",
        "euPago": 32.98,
        "valor": 32.98,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Uber",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-85",
        "linha": 85,
        "oQue": "Uber / Transporte (limite)",
        "euPago": 36.7,
        "valor": 36.7,
        "parcelaAtual": "1.0",
        "numParcelas": "1.0",
        "motivo": "Uber",
        "cartao": "C/C Itaú"
      },
      {
        "id": "c-86",
        "linha": 86,
        "oQue": "Vestuário",
        "euPago": 62.96,
        "valor": 62.96,
        "parcelaAtual": "3.0",
        "numParcelas": "3.0",
        "motivo": "Uniforme PMESP",
        "cartao": "C/C BB"
      },
      {
        "id": "c-87",
        "linha": 87,
        "oQue": "Vestuário",
        "euPago": 79.99,
        "valor": 79.99,
        "parcelaAtual": "5.0",
        "numParcelas": "5.0",
        "motivo": "OCULOS SOL NEW ERA",
        "cartao": "C/C BB"
      }
    ]
  },
  "transacoes": [
    {
      "id": "tx-1",
      "data": "2026-08-05",
      "descricao": "Gympass",
      "categoria": "Academia (mensal)",
      "valor": 54.99,
      "tipo": "fixa",
      "cartao": "C/C Itaú",
      "parcela": "-/-"
    },
    {
      "id": "tx-2",
      "data": "2026-08-05",
      "descricao": "Cafe",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 8.96,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-3",
      "data": "2026-08-05",
      "descricao": "Almoço",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 57.0,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-4",
      "data": "2026-08-05",
      "descricao": "Cafe",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 15.78,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-5",
      "data": "2026-08-05",
      "descricao": "Almoço",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 90.0,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-6",
      "data": "2026-08-05",
      "descricao": "Almoço",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 23.98,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-7",
      "data": "2026-08-05",
      "descricao": "Almoço",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 30.0,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-8",
      "data": "2026-08-05",
      "descricao": "Cafe",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 21.92,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-9",
      "data": "2026-08-05",
      "descricao": "Almoço",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 25.0,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-10",
      "data": "2026-08-05",
      "descricao": "Cafe",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 17.46,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-11",
      "data": "2026-08-05",
      "descricao": "Cafe",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 7.92,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-12",
      "data": "2026-08-05",
      "descricao": "Almoço",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 12.0,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-13",
      "data": "2026-08-05",
      "descricao": "Cafe",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 17.0,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-14",
      "data": "2026-08-05",
      "descricao": "Cafe",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 30.0,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    },
    {
      "id": "tx-15",
      "data": "2026-08-05",
      "descricao": "Cafe",
      "categoria": "Alimentação trabalho (limite)",
      "valor": 42.95,
      "tipo": "variavel",
      "cartao": "C/C BB",
      "parcela": "1.0/1.0"
    }
  ],
  "investimentos": {
    "patrimonioTotal": 26582.66,
    "aportesMensais": 3417.34,
    "rentabilidadeAnual": 11.45,
    "carteira": [
      {
        "ativo": "Tesouro Selic / Renda Fixa",
        "tipo": "Reserva & Proteção",
        "valor": 14500.0,
        "pct": 54.5
      },
      {
        "ativo": "CDB Sofisa Direto / Liquidez",
        "tipo": "Reserva Emergência",
        "valor": 7200.0,
        "pct": 27.1
      },
      {
        "ativo": "Fundos Imobiliários (FIIs)",
        "tipo": "Renda Passiva",
        "valor": 3100.0,
        "pct": 11.7
      },
      {
        "ativo": "Ações & ETFs",
        "tipo": "Crescimento",
        "valor": 1782.66,
        "pct": 6.7
      }
    ]
  },
  "metas": [
    {
      "row": 4,
      "descricao": "Meta",
      "concluido": false,
      "categoria": "Motivo",
      "raw": [
        "Meta",
        "Motivo",
        "Prioridade",
        "Valor",
        "Prazo",
        "Tipo de prazo",
        "Ação "
      ]
    },
    {
      "row": 5,
      "descricao": "Reserva Financeira",
      "concluido": true,
      "categoria": "Para emergências",
      "raw": [
        "Reserva Financeira",
        "Para emergências",
        "⭐⭐⭐⭐⭐",
        "30000.0",
        "30.0",
        "Médio prazo",
        "Investir CDB Sofisa Direto"
      ]
    },
    {
      "row": 6,
      "descricao": "Notebook",
      "concluido": false,
      "categoria": "Estudos",
      "raw": [
        "Notebook ",
        "Estudos",
        "⭐⭐⭐⭐",
        "3000.0",
        "24.0",
        "Médio prazo",
        "-"
      ]
    },
    {
      "row": 7,
      "descricao": "Viagem internacional",
      "concluido": false,
      "categoria": "Turismo",
      "raw": [
        "Viagem internacional",
        "Turismo",
        "⭐⭐⭐",
        "12000.0",
        "60+",
        "Longo prazo",
        "-"
      ]
    },
    {
      "row": 8,
      "descricao": "Neuropsicólogo",
      "concluido": false,
      "categoria": "Saúde mental",
      "raw": [
        "Neuropsicólogo ",
        "Saúde mental",
        "⭐⭐⭐",
        "2000.0",
        "24.0",
        "Curto prazo",
        "-"
      ]
    },
    {
      "row": 9,
      "descricao": "Psiquiatra",
      "concluido": false,
      "categoria": "Saúde mental",
      "raw": [
        "Psiquiatra",
        "Saúde mental",
        "⭐⭐⭐",
        "500.0",
        "24.0",
        "Curto prazo",
        "-"
      ]
    },
    {
      "row": 10,
      "descricao": "Moto",
      "concluido": false,
      "categoria": "Deslocamento",
      "raw": [
        "Moto",
        "Deslocamento",
        "⭐⭐⭐",
        "8000.0",
        "12.0",
        "Curto prazo",
        "-"
      ]
    },
    {
      "row": 11,
      "descricao": "Aula de bateria",
      "concluido": false,
      "categoria": "Hobbie",
      "raw": [
        "Aula de bateria",
        "Hobbie",
        "⭐⭐",
        "2359.87",
        "24.0",
        "Médio prazo",
        "-"
      ]
    },
    {
      "row": 12,
      "descricao": "Cachorrinho maltês",
      "concluido": false,
      "categoria": "Amor e terapia",
      "raw": [
        "Cachorrinho maltês",
        "Amor e terapia",
        "⭐⭐",
        "2500.0",
        "60+",
        "Longo prazo",
        "-"
      ]
    },
    {
      "row": 13,
      "descricao": "Arma particular",
      "concluido": false,
      "categoria": "Segurança pessoal",
      "raw": [
        "Arma particular",
        "Segurança pessoal",
        "⭐⭐",
        "4000.0",
        "60+",
        "Longo prazo",
        "-"
      ]
    },
    {
      "row": 14,
      "descricao": "Lentes resina",
      "concluido": false,
      "categoria": "Alto estima",
      "raw": [
        "Lentes resina",
        "Alto estima",
        "⭐",
        "5000.0",
        "60+",
        "Longo prazo",
        "-"
      ]
    },
    {
      "row": 15,
      "descricao": "Carro",
      "concluido": true,
      "categoria": "Necessidade",
      "raw": [
        "Carro",
        "Necessidade",
        "⭐⭐⭐⭐⭐",
        "34000.0",
        "48X",
        "Curto prazo",
        "Entrada C/C 48x + financiamento"
      ]
    },
    {
      "row": 16,
      "descricao": "Adição de Categoria \"A\"",
      "concluido": true,
      "categoria": "CNH - Necessidade",
      "raw": [
        "Adição de Categoria \"A\"",
        "CNH - Necessidade",
        "⭐⭐⭐⭐⭐",
        "1300.0",
        "5.0",
        "Curto prazo",
        "Planejado no orçamento"
      ]
    },
    {
      "row": 17,
      "descricao": "Passaporte",
      "concluido": true,
      "categoria": "Documento viajar",
      "raw": [
        "Passaporte",
        "Documento viajar",
        "⭐⭐⭐⭐",
        "257.25",
        "12.0",
        " Curto prazo",
        "Planejado no orçamento"
      ]
    },
    {
      "row": 18,
      "descricao": "Trocar de celular",
      "concluido": true,
      "categoria": "O meu atual obssoleto",
      "raw": [
        "Trocar de celular",
        "O meu atual obssoleto",
        "⭐⭐⭐⭐",
        "5500.0",
        "24.0",
        "Médio prazo",
        "Planejado no orçamento"
      ]
    },
    {
      "row": 19,
      "descricao": "Implantes dentários",
      "concluido": true,
      "categoria": "Emergência médica",
      "raw": [
        "Implantes dentários",
        "Emergência médica",
        "⭐⭐⭐⭐⭐",
        "2350.0",
        "7.0",
        "Curto prazo",
        "Planejado no orçamento"
      ]
    },
    {
      "row": 20,
      "descricao": "Tatuagem",
      "concluido": false,
      "categoria": "Geral",
      "raw": []
    },
    {
      "row": 21,
      "descricao": "Coturno PM",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 22,
      "descricao": "Coldre velado",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 23,
      "descricao": "Fone bluetooth",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 24,
      "descricao": "Porta tonfa",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 25,
      "descricao": "Agenda",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 26,
      "descricao": "Tatuagem",
      "concluido": true,
      "categoria": "Geral",
      "raw": []
    },
    {
      "row": 27,
      "descricao": "Alicate",
      "concluido": true,
      "categoria": "Geral",
      "raw": []
    },
    {
      "row": 28,
      "descricao": "Tapete interno carro",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 29,
      "descricao": "Tampa reservatórios",
      "concluido": true,
      "categoria": "⭐⭐⭐",
      "raw": []
    },
    {
      "row": 30,
      "descricao": "Brucutu carro",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 31,
      "descricao": "Exames clínica Habib",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 32,
      "descricao": "Exames Dr Consulta",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 33,
      "descricao": "Óculos de grau",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 34,
      "descricao": "Dentista restaurações",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 35,
      "descricao": "Cadeira escritório",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 36,
      "descricao": "Tênis para corrida",
      "concluido": true,
      "categoria": "⭐⭐⭐⭐",
      "raw": []
    },
    {
      "row": 37,
      "descricao": "Acessórios (colar, brinco)",
      "concluido": true,
      "categoria": "Geral",
      "raw": []
    }
  ]
};

const StorageEngine = {
  currentUserId: null,
  syncListeners: [],

  getStorageKey() {
    return this.currentUserId ? `victor_finance_user_${this.currentUserId}` : STORAGE_KEY;
  },

  setUserId(userId) {
    this.currentUserId = userId;
  },

  onSyncStatus(callback) {
    if (typeof callback === 'function') {
      this.syncListeners.push(callback);
    }
  },

  emitSyncStatus(status, message) {
    this.syncListeners.forEach(cb => {
      try { cb(status, message); } catch(e) {}
    });
  },

  load() {
    const key = this.getStorageKey();
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.years) {
          // Garante que cartaoOutubro e configuracoes de Outubro existam mesmo em caches antigos
          if (!parsed.cartaoOutubro) {
            parsed.cartaoOutubro = JSON.parse(JSON.stringify(DEFAULT_FINANCIAL_DATA.cartaoOutubro));
          }
          if (!parsed.selectedMonth) parsed.selectedMonth = 'Outubro';
          if (!parsed.faturaAtiva) parsed.faturaAtiva = 'Outubro';
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao ler LocalStorage, usando dados padrão', e);
    }
    this.save(DEFAULT_FINANCIAL_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_FINANCIAL_DATA));
  },

  save(data, syncCloud = true) {
    const key = this.getStorageKey();
    try {
      localStorage.setItem(key, JSON.stringify(data));
      
      // Sincronização em nuvem via CloudStorage se usuário estiver autenticado
      if (syncCloud && this.currentUserId && typeof CloudStorage !== 'undefined') {
        this.emitSyncStatus('syncing', 'Sincronizando com Firestore...');
        CloudStorage.saveUserData(this.currentUserId, data)
          .then(success => {
            if (success) {
              this.emitSyncStatus('synced', 'Salvo na Nuvem');
            } else {
              this.emitSyncStatus('offline', 'Salvo localmente (offline)');
            }
          })
          .catch(() => {
            this.emitSyncStatus('offline', 'Salvo localmente');
          });
      } else {
        this.emitSyncStatus('synced', 'Salvo localmente');
      }

      return true;
    } catch (e) {
      console.error('Falha ao salvar no LocalStorage', e);
      this.emitSyncStatus('error', 'Erro ao salvar');
      return false;
    }
  },

  async syncNow() {
    if (this.currentUserId && typeof CloudStorage !== 'undefined') {
      const currentData = this.load();
      this.emitSyncStatus('syncing', 'Sincronizando com Firestore...');
      const ok = await CloudStorage.saveUserData(this.currentUserId, currentData);
      if (ok) {
        this.emitSyncStatus('synced', 'Salvo na Nuvem');
        return { success: true, message: 'Dados salvos no Cloud Firestore com sucesso!' };
      } else {
        const err = CloudStorage.lastError ? CloudStorage.lastError.message : 'Falha ao salvar no Firestore';
        this.emitSyncStatus('offline', 'Modo offline (salvo local)');
        return { success: false, message: err };
      }
    } else {
      this.emitSyncStatus('synced', 'Salvo localmente');
      return { success: true, message: 'Dados preservados no cache local do navegador.' };
    }
  },

  async syncWithCloud(userId) {
    if (!userId || typeof CloudStorage === 'undefined') return this.load();
    this.setUserId(userId);
    this.emitSyncStatus('syncing', 'Conectando ao Firestore...');

    try {
      const cloudData = await CloudStorage.loadUserData(userId);
      if (cloudData && cloudData.years) {
        // Documento existe na nuvem: atualiza cache local
        this.save(cloudData, false);
        this.emitSyncStatus('synced', 'Nuvem conectada');
        return cloudData;
      } else {
        // Primeiro acesso: sincroniza dados locais/padrão para o Firestore do usuário
        const currentData = this.load();
        await CloudStorage.saveUserData(userId, currentData);
        this.emitSyncStatus('synced', 'Dados iniciais salvos na nuvem');
        return currentData;
      }
    } catch (err) {
      console.warn('Falha na sincronização inicial com Firestore:', err);
      this.emitSyncStatus('offline', 'Modo offline ativo');
      return this.load();
    }
  },

  exportJSON() {
    const data = this.load();
    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", str);
    dlAnchor.setAttribute("download", `backup_victor_financeiro_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
    dlAnchor.remove();
  },

  exportCSV() {
    const data = this.load();
    const rows = [
      ["Data", "Descricao", "Categoria", "Tipo", "Valor (R$)", "Forma Pagamento"]
    ];

    if (Array.isArray(data.transacoes)) {
      data.transacoes.forEach(t => {
        rows.push([
          `"${t.data || ''}"`,
          `"${(t.descricao || '').replace(/"/g, '""')}"`,
          `"${(t.categoria || '').replace(/"/g, '""')}"`,
          `"${t.tipo || ''}"`,
          (Number(t.valor) || 0).toFixed(2),
          `"${(t.formaPagamento || '').replace(/"/g, '""')}"`
        ]);
      });
    }

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + rows.map(e => e.join(";")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lancamentos_financeiro_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.years) {
        this.save(parsed, true);
        return true;
      }
    } catch (e) {
      console.error('JSON inválido', e);
    }
    return false;
  },

  resetDefaults() {
    this.save(DEFAULT_FINANCIAL_DATA, true);
    return JSON.parse(JSON.stringify(DEFAULT_FINANCIAL_DATA));
  }
};


