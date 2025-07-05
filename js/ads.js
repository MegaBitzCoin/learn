// ads.js - Script para exibir propagandas da magsrv.com
(function() {
    'use strict';
    
    // Função para carregar script do AdProvider
    function loadAdProvider() {
        if (window.AdProvider) {
            initializeAds();
            return;
        }
        
        const script = document.createElement('script');
        script.async = true;
        script.type = 'application/javascript';
        script.src = 'https://a.magsrv.com/ad-provider.js';
        script.onload = initializeAds;
        script.onerror = function() {
            console.error('Erro ao carregar AdProvider');
        };
        
        document.head.appendChild(script);
    }
    
    // Função para criar elemento de anúncio
    function createAdElement(zoneId, className = 'eas6a97888e2') {
        const insElement = document.createElement('ins');
        insElement.className = className;
        insElement.setAttribute('data-zoneid', zoneId);
        return insElement;
    }
    
    // Função para inicializar anúncios
    function initializeAds() {
        // Servir anúncios existentes na página
        (window.AdProvider = window.AdProvider || []).push({"serve": {}});
        
        console.log('Anúncios inicializados');
    }
    
    // Função para adicionar anúncio em elemento específico
    function addAdToElement(elementId, zoneId, className = 'eas6a97888e2') {
        const container = document.getElementById(elementId);
        if (!container) {
            console.error('Elemento não encontrado:', elementId);
            return false;
        }
        
        const adElement = createAdElement(zoneId, className);
        container.appendChild(adElement);
        
        // Servir o novo anúncio
        if (window.AdProvider) {
            (window.AdProvider = window.AdProvider || []).push({"serve": {}});
        }
        
        return true;
    }
    
    // Função para adicionar anúncio dinamicamente
    function insertAd(zoneId, options = {}) {
        const {
            elementId = null,
            className = 'eas6a97888e2',
            position = 'beforeend',
            target = document.body
        } = options;
        
        const adElement = createAdElement(zoneId, className);
        
        if (elementId) {
            const container = document.getElementById(elementId);
            if (container) {
                container.appendChild(adElement);
            }
        } else {
            target.insertAdjacentElement(position, adElement);
        }
        
        // Servir o anúncio
        if (window.AdProvider) {
            (window.AdProvider = window.AdProvider || []).push({"serve": {}});
        }
    }
    
    // Inicializar quando DOM estiver pronto
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadAdProvider);
        } else {
            loadAdProvider();
        }
    }
    
    // Expor funções globais
    window.AdsJS = {
        addAd: addAdToElement,
        insertAd: insertAd,
        reload: function() {
            if (window.AdProvider) {
                (window.AdProvider = window.AdProvider || []).push({"serve": {}});
            }
        }
    };
    
    // Inicializar
    init();
    
})();