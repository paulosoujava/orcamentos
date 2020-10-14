-- name: createGenreic
INSERT INTO generic (nome, email, telefone, cidade, uf, obs, endereco)
VALUES (:nome,  :email, :telefone, :cidade, :uf, :obs, :endereco);

-- name: checkByEmail
SELECT * FROM orcamento.generic WHERE email = :email;

-- name: checkById
SELECT * FROM orcamento.generic WHERE idGeneric = :id;

-- name: updateByEmail
UPDATE generic
SET nome = :nome,  telefone= :telefone, cidade= :cidade, uf= :uf, obs= :obs, endereco= :endereco
WHERE  email = :email;

--name: deleteGeneric
DELETE  FROM orcamento.generic WHERE email = :email;

--name: getAll
SELECT * FROM orcamento.generic

--name: getOne
SELECT * FROM orcamento.generic WHERE email = :email

--name: createOrcPed
INSERT INTO orcPed (idOrcPed, tipo, localEntrega, validade, criacao, quantidadeItens, valorTotal, obs, idGeneric, situacao )
VALUES (:idOrcPed, :tipo,  :localEntrega, :validade, :criacao, :quantidadeItens, :valorTotal, :obs, :idGeneric, :situacao);

-- name: checkByIdInOrcPed
SELECT * FROM orcamento.orcPed WHERE idOrcPed = :id;

-- name: updateOrcPed
UPDATE orcamento.orcPed
SET tipo = :tipo,  localEntrega= :localEntrega, validade= :validade, criacao= :criacao, quantidadeItens= :quantidadeItens, valorTotal= :valorTotal, obs= :obs, situacao= :situacao, idOrcPed = :idOrcPed
WHERE  idOrcPed = :id;

--name: deleteOrcPed
DELETE  FROM orcamento.orcPed WHERE idOrcPed = :id;

--name: createOrcPedItem
INSERT INTO orcPedItem (descricao, valorUnitario, quantidade,   valorTotal, obs, idOrcPed)
VALUES (:descricao,  :valorUnitario, :quantidade,   :valorTotal, :obs, :idOrcPed);

-- name: checkByIdInOrcPedItem
SELECT * FROM orcamento.orcPedItem WHERE idOrcPedItem = :id;

-- name: updateOrcPedItem
UPDATE orcamento.orcPedItem
SET descricao = :descricao,  valorUnitario= :valorUnitario, quantidade= :quantidade, valorTotal= :valorTotal, valorTotal= :valorTotal, obs= :obs
WHERE  idOrcPedItem = :id;

--name: deleteOrcPedItem
DELETE  FROM orcamento.orcPedItem WHERE idOrcPedItem = :id;
